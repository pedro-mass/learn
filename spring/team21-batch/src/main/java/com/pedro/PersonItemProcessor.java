package com.pedro;

import org.springframework.batch.item.ItemProcessor;

public class PersonItemProcessor implements ItemProcessor<Person, Person> {

    @Override
    public Person process(final Person person) throws Exception {
        Person transformedPerson = new Person(toProperCase(person.getName()), person.getRole().toUpperCase());

        System.out.println("Converting (" + person+ ") into (" + transformedPerson + ")");

        return transformedPerson;
    }

    private String toProperCase(String input) {
        String result = "";

        if(input != null) {
            result = input.substring(0, 1).toUpperCase() +
                    input.substring(1).toLowerCase();
        }

        return result;
    }
}