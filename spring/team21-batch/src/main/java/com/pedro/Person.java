package com.pedro;

/**
 * Created by pedromass on 12/30/14.
 */
public class Person {

    private String name;
    private String role;

    public Person() {}

    public Person(String name, String role) {
        this.name = name;
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return name + " is a " + role;
    }
}
