package hac.javareact;

import java.io.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;

/* You can delete this comment before submission - it's only here to help you get started.
Your servlet should be available at "/java_react_war/api/highscores"
assuming you don't modify the application's context path (/java_react_war).
on the client side, you can send request to the servlet using:
fetch("/java_react_war/api/highscores")
*/

@WebServlet(name = "ServletApi", value = "/api/highscores")
public class ApiServlet extends HttpServlet {

    private static final String SCORES_FILE = "scores.dat";
    private static final int MAX_HIGH_SCORES = 5;

    private List<Score> highScores;

    @Override
    public void init() {
        // Load high scores from file
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(getScoresFilePath()))) {
            highScores = (List<Score>) ois.readObject();
        } catch (IOException | ClassNotFoundException e) {
            // Handle file read errors
            highScores = new ArrayList<>();
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Retrieve top 5 high scores ordered by increasing guesses
        List<Score> topHighScores = highScores.stream()
                .sorted(Comparator.comparingInt(Score::getGuesses))
                .limit(MAX_HIGH_SCORES)
                .collect(Collectors.toList());

        // Send high scores as JSON response
        response.setContentType("application/json");
        response.getWriter().println(new Gson().toJson(topHighScores));
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Read user name and score from request body
        String requestBody = request.getReader().lines().collect(Collectors.joining());
        JsonObject jsonObject = new JsonParser().parse(requestBody).getAsJsonObject();
        String username = jsonObject.get("username").getAsString();
        int score = jsonObject.get("score").getAsInt();

        // Check for duplicate user name
        if (highScores.stream().anyMatch(hs -> hs.getUsername().equals(username))) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().println("{\"error\":\"Duplicate user name\"}");
            return;
        }

        // Add new high score
        highScores.add(new Score(username, score));

        // Sort high scores by increasing guesses
        highScores.sort(Comparator.comparingInt(Score::getGuesses));

        // Keep only top 5 high scores
        if (highScores.size() > MAX_HIGH_SCORES) {
            highScores = highScores.subList(0, MAX_HIGH_SCORES);
        }

        // Write updated high scores to file
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(getScoresFilePath()))) {
            oos.writeObject(highScores);
        } catch (IOException e) {
            // Handle file write errors
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().println("{\"error\":\"Failed to write high scores\"}");
            return;
        }

        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().println("{\"message\":\"High score added successfully\"}");
    }

    private String getScoresFilePath() {
        return getServletContext().getRealPath(".") + File.separator + SCORES_FILE;
    }
}
