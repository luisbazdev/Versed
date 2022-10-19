package com.versed.sessions.mentorship;

public class MentorshipResponse {
    private Mentorship mentorship;
    private String message;
    private boolean success;
    

    public MentorshipResponse() {
    }

    public Mentorship getMentorship() {
        return this.mentorship;
    }

    public void setMentorship(Mentorship mentorship) {
        this.mentorship = mentorship;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return this.success;
    }

    public boolean getSuccess() {
        return this.success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

}
