package hac.javareact;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.io.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.nio.file.Files;
import java.util.*;
import java.util.stream.Collectors;

/**
 A servlet that provides an API for retrieving and adding high scores for the game.
 */
@WebServlet(name = "ServletApi", value = "/api/highscores")
public class ApiServlet extends HttpServlet {
    /**
     * Name of the file where the high scores are stored.
     */
    private String fileName;

    /**
     * Handles GET requests to retrieve the top 5 high scores.
     * @param request The HTTP request.
     * @param response The HTTP response.
     * @throws IOException If an I/O error occurs while handling the request.
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        try {
            List<Score> scores = loadScores();
            JsonArray jsonArray = createFormattedArray(scores);
            response.setStatus(HttpServletResponse.SC_OK);

            // Create a JSON object with the scores array
            JsonObject jsonResponse = new JsonObject();
            jsonResponse.add("scores", jsonArray);

            // Write the JSON object to the response output stream
            PrintWriter out = response.getWriter();
            out.print(jsonResponse.toString());
            out.flush();
        } catch (ClassNotFoundException e) {
            sendError(response, "Failed to load scores.", HttpServletResponse.SC_CONFLICT);
        }
    }

    /**
     * Sends an error response to the client.
     * @param response The HTTP response.
     * @param errMsg The error message to send.
     * @param errorCode The HTTP error code to send.
     */
    private void sendError(HttpServletResponse response, String errMsg, int errorCode) {
        try {
            response.setStatus(errorCode);
            JsonObject jsonResponse = new JsonObject();
            jsonResponse.addProperty("error", errMsg);
            PrintWriter out = response.getWriter();
            out.print(jsonResponse.toString());
            out.flush();
        } catch (IOException e) {
            // No point in sending an error about "fail in trying to send an error" since it's recursive
        }
    }

    /**
     * Creates a formatted JSON array with the top 5 high scores.
     * @param scores The list of all high scores.
     * @return A formatted JSON array with the top 5 high scores.
     */
    private JsonArray createFormattedArray(List<Score> scores) {
        // Sort the scores list by guesses in descending order
        scores.sort(Comparator.comparingInt(Score::getGuesses));
        // Take the first 5 scores from the sorted list
        List<Score> top5Scores = scores.stream().limit(5).collect(Collectors.toList());

        //Creating a Json array of the top 5
        JsonArray jsonArray = new JsonArray();
        for (Score score : top5Scores) {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("name", score.getName());
            jsonObject.addProperty("score", score.getGuesses());
            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }

    /**
     * Handles POST requests to add a new high score.
     * @param request The HTTP request.
     * @param response The HTTP response.
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin","*");
        String name = request.getParameter("name");
        String scoreStr = request.getParameter("score");
        int currScore;
        try {
            currScore = Integer.parseInt(scoreStr);
            Score highScore = new Score(name,currScore);
            handleHighScore(response,highScore);
        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

            sendError(response, "Server has occurred an internal error", HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
    private synchronized void handleHighScore(HttpServletResponse res,Score score){
        try{
            addScore(score);
            res.setStatus(HttpServletResponse.SC_OK);
        } catch(IOException e){
            sendError(res, "Failed to read/write to file", HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
        catch(ClassNotFoundException e){
            sendError(res,"Failed to read scores", HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
    @Override
    public void init() {
        // Param stored in web.xml.
        fileName = getServletContext().getInitParameter("filename");
    }

    @Override
    public void destroy() {
    }

    private synchronized void addScore(Score newScore) throws IOException, ClassNotFoundException {
        File file = getFile();
        List<Score> scores = loadScores();
        final int NOTFOUND = -1;

        int index = handleDupes(newScore, scores);
        if(index != NOTFOUND)
            scores.set(index, newScore);
        else
            scores.add(newScore);

        try(ObjectOutputStream oos = new ObjectOutputStream(Files.newOutputStream(file.toPath()))){
            oos.writeObject(scores);
        }
    }

    private int handleDupes(Score newScore, List<Score> scores){
        int index = -1;
        // Iterate over the scores list and check for duplicates
        for (int i = 0; i < scores.size(); i++) {
            Score score = scores.get(i);
            if (score.getName().equals(newScore.getName())) {
                if (newScore.getGuesses() <= score.getGuesses())
                    index = i;
                break;
            }
        }
        return index;
    }

    private List<Score> loadScores() throws ClassNotFoundException, IOException {
        File file = getFile();
        List<Score> scores = new ArrayList<>();
        try(ObjectInputStream ois = new ObjectInputStream(Files.newInputStream(file.toPath()))){
            scores = (List<Score>) ois.readObject();
        } catch(EOFException e){
            //Ignore this
        } finally {
            return scores;
        }
    }

    private File getFile() throws IOException{
        String realPath = getServletContext().getRealPath(fileName);
        File file = new File(realPath);
            if(!file.exists()){
                file.createNewFile();
            }
        return file;
    }
}