package hac.javareact;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.io.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
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
    FileInputStream reader;
    FileOutputStream writer;
    private static final String SCORES_FILE = "scores.dat";
    private static final String nameParam = "name";
    private static final String scoreParam = "score";

    /**
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
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
            jsonResponse.addProperty("msg", "You suck");
            // Write the JSON object to the response output stream
            PrintWriter out = res.getWriter();
            out.print(gson.toJson(jsonResponse));
            out.flush();

        } catch(IOException e){
            res.setStatus(HttpServletResponse.SC_CONFLICT);
        }
        catch(ClassNotFoundException e){
            res.setStatus(HttpServletResponse.SC_CONFLICT);
        }
    }
    @Override
    public void init() {
        //This for now (find something to do here)
        //try {
       //     writer = new FileOutputStream("scores.dat");
       // } catch (FileNotFoundException e) {
       //     throw new RuntimeException(e);
        //}
    }


    @Override
    public void destroy() {
    }




    private synchronized void addScore(Score newScore) throws IOException, ClassNotFoundException {

        List<Score> scores = loadScores(); // read in existing scores
        scores.add(newScore); // add new score
        String realPath = getServletContext().getRealPath("scores");
        FileOutputStream fos = new FileOutputStream(realPath, false); // open file for writing (false to overwrite)
        ObjectOutputStream oos = new ObjectOutputStream(fos);
        for (Score score : scores) {
            oos.writeObject(score); // write each score to the file
        }
        oos.close();
    }

    private List<Score> loadScores() throws IOException, ClassNotFoundException {

        List<Score> scores = new ArrayList<>();
        String realPath = getServletContext().getRealPath("scores");
        FileInputStream fis = new FileInputStream(realPath);
        ObjectInputStream ois = new ObjectInputStream(fis);
        try {
            while (true) {
                Score score = (Score) ois.readObject();
                scores.add(score);
            }
        } catch (EOFException e) {
            // end of file reached, ignore exception
        }
        ois.close();
        return scores;
    }



}
