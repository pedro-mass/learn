@Configuration
@Scope(proxyMode = ScopedProxyMode.TARGET_CLASS)
@Import(BatchInfrastructureConfiguration.class)
public class BatchImporterConfiguration {

	@Bean(name = "flickrImportJob")
	public Job flickrImportJob(JobBuilderFactory jobs, @Qualifier("step1") Step s1) {
		return jobs.get("flickrImportJob")
					.flow(s1)
					.end()
					.build();
	}

	@Bean(name = "step1")
	public Step step1(StepBuilderFactory stepBuilderFactory,
						@Qualifier("photoAlbumItemReader") ItemReader ir,
						@Qualifier("photoAlbumItemWriter") ItemWriter iw) {
		return stepBuilderFactory.get("step1")
				.chunk(10)
				.reader(ir)
				.writer(iw)
				.build();
	}
	// ... omitting definitions of ItemReader and ItemWriters
}
