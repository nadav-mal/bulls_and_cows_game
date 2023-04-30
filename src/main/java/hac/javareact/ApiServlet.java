package hac.javareact;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.io.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.nio.file.Files;
import java.util.*;
import java.util.stream.Collectors;
/* You can delete this comment before submission - it's only here to help you get started.
Your servlet should be available at "/java_react_war/api/highscores"
assuming you don't modify the application's context path (/java_react_war).
on the client side, you can send request to the servlet using:
fetch("/java_react_war/api/highscores")
*/

@WebServlet(name = "ServletApi", value = "/api/highscores")
public class ApiServlet extends HttpServlet {
    private String fileName;

    /**
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("In get");
        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin","*");
        try {
            List<Score> scores = loadScores();
            JsonArray jsonArray = createFormattedArray(scores);
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(jsonArray.toString());
        } catch (ClassNotFoundException e) {
            response.setStatus(HttpServletResponse.SC_CONFLICT);
        }
    }

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
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println(fileName);

        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin","*");

        String name = request.getParameter("name");
        String scoreStr = request.getParameter("score");
        int currScore = 0;
        try {
            currScore = Integer.parseInt(scoreStr);
            Score highScore = new Score(name,currScore);
            handleHighScore(response,highScore);
        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        } finally {
            System.out.println("After post");
        }
    }
    private synchronized void handleHighScore(HttpServletResponse res,Score score){
        try{
            addScore(score);
            res.setStatus(HttpServletResponse.SC_OK);
            // Create a JSON object with the given parameters
            Gson gson = new Gson();
            JsonObject jsonResponse = new JsonObject();
            jsonResponse.addProperty("name", score.getName());
            jsonResponse.addProperty("score", score.getGuesses());
            // Write the JSON object to the response output stream
            PrintWriter out = res.getWriter();
            out.print(gson.toJson(jsonResponse));
            out.flush();

        } catch(IOException e){
            System.out.println("In IO ");
            res.setStatus(HttpServletResponse.SC_CONFLICT);
        }
        catch(ClassNotFoundException e){
            System.out.println("In classNotFound");
            res.setStatus(HttpServletResponse.SC_CONFLICT);
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
                if (newScore.getGuesses() < score.getGuesses())
                    index = i;
                break;
            }
        }
        return index;
    }

    private List<Score> loadScores() throws ClassNotFoundException {
        File file = getFile();
        List<Score> scores = new ArrayList<>();
        try(ObjectInputStream ois = new ObjectInputStream(Files.newInputStream(file.toPath()))){
            System.out.println("Before reading obj");
            scores = (List<Score>) ois.readObject();
            System.out.println("TEST" + scores);
        } catch(EOFException e){
            //Ignore this
            System.out.println("In EOF137--");

        } finally {
            System.out.println(scores);
            return scores;
        }
    }

    private File getFile(){
        String realPath = getServletContext().getRealPath("scores");
        File file = new File(realPath);
        try{
            if(!file.exists()){
                file.createNewFile();
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return file;
    }
}