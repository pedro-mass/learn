package com.mkyong.model;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.mkyong.adapter.JaxbBigDecimalAdapter;
import com.mkyong.adapter.JaxbDateAdapter;

@XmlRootElement(name = record)
public class Report {

    private int refId;
    private String name;
    private int age;
    private Date dob;
    private BigDecimal income;

    @XmlAttribute(name = "refId")
    public int getRefId() {
        return refId;
    }

    public void setRefId(int refId) {
        this.refId = refId;
    }

    @XmlElement(name = "age")
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @XmlElement
    public String getName() {
        return name;
    }

    @XmlJavaTypeAdapter(JaxbDateAdapter.class)
    @XmlElement
    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    @XmlJavaTypeAdapter(JaxbBigDecimalAdapter.class)
    @XmlElement
    public BigDecimal getIncome() {
        return income;
    }

    public void setIncome(BigDecimal income) {
        this.income = income;
    }

    // for csv file only
    public String getCsvDob() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        return dateFormat.format(getDob());
    }
}