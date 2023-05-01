package hac.javareact;

import java.io.Serializable;

/**
 * Represents a score for a guessing game.
 * <p>
 * Each score contains a player's name and the number of guesses they needed to correctly guess a number.
 * Scores can be compared based on the number of guesses, in ascending order.
 */
public class Score implements Serializable, Comparable<Score> {
    /**
     * The name of the player who achieved this score.
     */
    private String name;

    /**
     * The number of guesses the player needed to correctly guess a number.
     */
    private int guesses;

    /**
     * Constructs a new Score object with the specified name and number of guesses.
     *
     * @param name    the name of the player
     * @param guesses the number of guesses the player needed
     */
    public Score(String name, int guesses) {
        this.name = name;
        this.guesses = guesses;
    }

    /**
     * Returns the name of the player who achieved this score.
     *
     * @return the name of the player
     */
    public String getName() {
        return name;
    }

    /**
     * Returns the number of guesses the player needed to correctly guess a number.
     *
     * @return the number of guesses
     */
    public int getGuesses() {
        return guesses;
    }

    /**
     * Compares this score to another score based on the number of guesses.
     * Returns a negative integer, zero, or a positive integer as this score is less than, equal to,
     * or greater than the specified score, based on the number of guesses.
     *
     * @param other the score to compare to
     * @return a negative integer, zero, or a positive integer as this score is less than, equal to,
     * or greater than the specified score, based on the number of guesses
     */
    @Override
    public int compareTo(Score other) {
        // Compare scores by number of guesses, ascending
        return Integer.compare(guesses, other.guesses);
    }
}
