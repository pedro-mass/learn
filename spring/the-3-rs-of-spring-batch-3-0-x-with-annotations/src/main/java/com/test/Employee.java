package com.test;

public class Employee {

	private Integer empId;
	private String lastName;
	private String title;
	private Integer salary;
	private String rank;

	public Integer getEmpId() {
		return empId;
	}
	public void setEmpId(Integer empId) {
		this.empId = empId;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Integer getSalary() {
		return salary;
	}
	public void setSalary(Integer salary) {
		this.salary = salary;
	}
	public void setRank(String rank) {
		this.rank = rank;
	}
	public String getRank() {
		return rank;
	}
	@Override
	public String toString() {
		return "Employee [empId=" + empId + ", lastName=" + lastName
				+ ", title=" + title + ", salary=" + salary + ", rank=" + rank
				+ "]";
	}
}