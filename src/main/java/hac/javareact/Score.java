package hac.javareact;

import java.io.Serializable;

public class Score implements Serializable, Comparable<Score> {
    private String name;
    private int guesses;

    public Score(String name, int guesses) {
        this.name = name;
        this.guesses = guesses;
    }

    public String getName() {
        return name;
    }

    public int getGuesses() {
        return guesses;
    }

    @Override
    public int compareTo(Score other) {
        // Compare scores by number of guesses, ascending
        return Integer.compare(guesses, other.guesses);
    }
}
