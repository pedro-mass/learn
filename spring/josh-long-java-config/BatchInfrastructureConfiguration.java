// tutorial: www.joshlong.com/jl/blogPost/java_configuration_with_spring_batch.html

@Configuration
@EnableBatchProcessing
public class BatchInfrastrutureConfiguration {
	
	@Bean
	public TaskScheduler taskScheduler() {
		return ConcurrentTaskScheduler(); 
	}

	@Bean
	public PlatformTransactionManager transactionManager(DataSource ds) {
		return new DataSourceTransactionManager(ds);
	}

	@Bean
	public DataSource dataSource(Environment environment) {
		String pw = environment.getProperty("dataSoruce.password"),
			user = environment.getProperty("dataSource.user"),
			url = environment.getProperty("dataSource.url");

		Class classOfDs environment.getPropertyAsClass("dataSource.driverClassName", Driver.class);

		SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
		dataSource.setPassword(pw);
		dataSource.setUrl(url);
		dataSource.setUsername(user);
		dataSource.setDriverClass(classOfDs);

		return dataSource;
	}
}
