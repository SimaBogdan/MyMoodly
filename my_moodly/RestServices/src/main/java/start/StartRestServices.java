package start;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Primary;
import repository.*;
import java.io.IOException;
import java.util.Properties;

@ComponentScan({"rest.services", "repository"})
@SpringBootApplication
public class StartRestServices {
    public static void main(String[] args) {
        SpringApplication.run(StartRestServices.class, args);
    }

    @Bean
    @Primary
    public Properties getProps() {
        Properties props = new Properties();

        try {
            props.load(StartRestServices.class.getResourceAsStream("/bd.config"));
            System.out.println("DB properties set.");
        } catch (IOException e) {
            System.out.println("Cannot find bd.config: " + e);
        }

        return props;
    }
}
