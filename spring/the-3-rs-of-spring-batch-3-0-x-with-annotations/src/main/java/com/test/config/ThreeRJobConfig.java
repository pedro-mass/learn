package com.test.config;

import java.io.File;

import javax.sql.DataSource;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.FlatFileItemWriter;
import org.springframework.batch.item.file.LineMapper;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.transform.BeanWrapperFieldExtractor;
import org.springframework.batch.item.file.transform.DelimitedLineAggregator;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;

import com.test.Employee;
import com.test.EmployeeProcessor;

@Configuration
@Import(StandaloneInfrastructureConfiguration.class)
public class ThreeRJobConfig {

    @Autowired
    private JobBuilderFactory jobBuilders;

    @Autowired
    private StepBuilderFactory stepBuilders;

    @Autowired
    private InfrastructureConfiguration infrastructureConfiguration;

    @Autowired
    private DataSource dataSource; // just for show...

    @Bean
    public Job threeRJob(){
        return jobBuilders.get("threeRJob")
                .start(step())
                .build();
    }

    @Bean
    public Step step(){
        return stepBuilders.get("step")
                .<Employee,Employee>chunk(1)
                .reader(reader())
                .processor(processor())
                .writer(writer())
                .build();
    }

    private ItemWriter<Employee> writer() {
        FlatFileItemWriter<Employee> itemWriter = new FlatFileItemWriter<Employee>();

        DelimitedLineAggregator<Employee> la = new DelimitedLineAggregator<Employee>();
        la.setDelimiter(",");

        BeanWrapperFieldExtractor<Employee> fieldExtractor = new BeanWrapperFieldExtractor<Employee>();
        fieldExtractor.setNames(new String[]{"empId","lastName","title","salary","rank"});

        la.setFieldExtractor(fieldExtractor);

        itemWriter.setLineAggregator(la);

        itemWriter.setResource(new FileSystemResource(new File("target/output_data.txt")));
        return itemWriter;
    }

    private ItemProcessor<Employee,Employee> processor() {
        return new EmployeeProcessor();
    }

    private ItemReader<Employee> reader() {
        FlatFileItemReader<Employee> itemReader = new FlatFileItemReader<Employee>();
        itemReader.setLineMapper(lineMapper());
        itemReader.setResource(new ClassPathResource("input_data.txt"));
        return itemReader;
    }

    private LineMapper<Employee> lineMapper() {
        DefaultLineMapper<Employee> lineMapper = new DefaultLineMapper<Employee>();
        DelimitedLineTokenizer lineTokenizer = new DelimitedLineTokenizer();
        lineTokenizer.setNames(new String[]{"empId","lastName","title","salary"});
        lineTokenizer.setIncludedFields(new int[]{0,1,2,3});
        BeanWrapperFieldSetMapper<Employee> fieldSetMapper = new BeanWrapperFieldSetMapper<Employee>();
        fieldSetMapper.setTargetType(Employee.class);
        lineMapper.setLineTokenizer(lineTokenizer);
        lineMapper.setFieldSetMapper(fieldSetMapper);
        return lineMapper;
    }


}