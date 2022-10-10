package com.versed.mentorships.config;

import com.versed.mentorships.mentorship.Mentorship;
import com.versed.mentorships.mentorship.MentorshipRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Date;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

@Configuration
public class MessagingConfig {
    private final MentorshipRepository repository;

    @Autowired
    public MessagingConfig(MentorshipRepository repository){
        this.repository = repository;
    }

    @Bean
    public Queue queue(){
        return new Queue("purchase", false);
    }
    
    @Bean
    public TopicExchange exchange(){
        return new TopicExchange("mentorships");
    }

    @Bean
    public Binding binding(Queue queue, TopicExchange exchange){
        return BindingBuilder.bind(queue).to(exchange).with("purchase.#");
    }

    @Bean
    public ConnectionFactory connectionFactory(){
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
        connectionFactory.setUri("amqp://guest:guest@localhost:5672");
        return connectionFactory;
    }

    @Bean
    public Jackson2JsonMessageConverter converter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(){
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory());
        return rabbitTemplate;
    }

    @RabbitListener(queues = "purchase")
    public void processOrder(Mentorship body){
        Mentorship mentorship = new Mentorship(
            body.getMentorId(), 
            body.getStudentId(), 
            body.getServiceId(), 
            body.getPrice(), 
            new Date(), 
            new Date(), 
            false
        );
        this.repository.save(mentorship);
    }
}