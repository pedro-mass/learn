package com.test;

import org.springframework.batch.item.ItemProcessor;

public class EmployeeProcessor implements ItemProcessor<Employee, Employee> {

    public Employee process(Employee emp) throws Exception {
        // if salary >= 2500 then set rank as "Director"    
        if(emp.getSalary() >= 2500 ) {
            emp.setRank("Director");
        } else {
            emp.setRank("N/A");
        }
        return emp;
    }

}