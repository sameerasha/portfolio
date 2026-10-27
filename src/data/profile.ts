import type { ProfileData } from '../types/portfolio';

/**
 * ============================================================================
 * CENTRAL PROFILE DATA CONFIGURATION
 * ============================================================================
 * Updated with verified information from Rabinarayan Asha's professional resume.
 */

export const profileData: ProfileData = {
  name: 'Rabinarayan Asha',
  fallbackTitle: 'Full Stack Developer',
  targetRole: 'Full Stack Developer / Java Microservices Engineer',
  totalExperience: '4.9+ Years',
  location: 'Bangalore, India',
  phone: '+91-8249067001',
  email: 'rabinarayanasha@gmail.com',

  headline: 'Engineering Scalable Systems. Building Event-Driven Microservices.',
  supportingCopy:
    'Technology Analyst at Infosys with 4.9+ years of experience specializing in Java 11, Spring Boot, Apache Kafka, Microservices architecture, Hibernate, and React.js.',

  socialLinks: {
    github: null,
    linkedin: null,
    githubSignup: 'https://github.com/signup',
    linkedinSignup: 'https://www.linkedin.com/signup',
  },

  resume: {
    available: true,
    url: '/Rabinarayan_Asha_Resume.pdf',
    fileName: 'Rabinarayan_Asha_Resume.pdf',
  },

  aboutDraft: {
    leadParagraph:
      'Experienced Software Engineer and Full Stack Developer with 4.9+ years of expertise in designing and implementing distributed Microservices architectures using Java 11, Spring Boot, Apache Kafka, and Hibernate, paired with modern responsive user interfaces in React.js and Redux.',
    bodyParagraph:
      'Currently serving as a Technology Analyst at Infosys in Bangalore, I architect mission-critical backend services, event-driven data streaming pipelines, and high-performance relational datastores. My engineering approach emphasizes design patterns (Singleton, Factory, Builder, DAO), database performance tuning (HQL, indexing), automated testing with Mockito and JUnit, and containerized CI/CD deployments using Docker, Kubernetes, and Jenkins.',
    focusAreas: [
      {
        title: 'Backend Systems & Microservices',
        description:
          'Designing decoupled, scalable microservices architectures using Spring Boot, Java 11, Hibernate ORM, and REST APIs with fault tolerance and modular service boundaries.',
        skills: ['Java 11', 'Spring Boot', 'Microservices', 'Hibernate', 'REST APIs', 'Design Patterns'],
      },
      {
        title: 'Event-Driven Streaming & Messaging',
        description:
          'Building high-throughput, real-time event-driven processing pipelines with Apache Kafka and Confluent Kafka Control Center for inter-service choreography.',
        skills: ['Apache Kafka', 'Confluent Kafka', 'Event-Driven', 'Real-time Processing', 'Redis'],
      },
      {
        title: 'Modern Frontend Engineering',
        description:
          'Creating responsive, accessible single-page applications and component libraries with React.js, React Redux, Material UI, TypeScript, and modern CSS3/Bootstrap.',
        skills: ['React.js', 'React Redux', 'Material UI', 'JavaScript', 'TypeScript', 'Node.js'],
      },
      {
        title: 'Database Management & Cloud DevOps',
        description:
          'Designing schemas, HQL queries, and transactional flows across PostgreSQL, Oracle, and MySQL. Orchestrating containerized workloads with Docker, Kubernetes, Jenkins CI/CD, and AWS.',
        skills: ['PostgreSQL', 'Oracle', 'MySQL', 'Docker', 'Kubernetes', 'Jenkins CI/CD', 'AWS'],
      },
    ],
  },

  skills: [
    // --- Backend & Core Languages (Verified from Resume) ---
    {
      name: 'Java (11 & 8)',
      isConfirmed: true,
      category: 'backend',
      description: 'Core object-oriented programming, modern Java 11 features, streams, concurrency, and memory management.',
    },
    {
      name: 'Spring Boot',
      isConfirmed: true,
      category: 'backend',
      description: 'Enterprise framework for building production-grade microservices, dependency injection, and actuator health monitoring.',
    },
    {
      name: 'Microservices Architecture',
      isConfirmed: true,
      category: 'backend',
      description: 'Domain decomposition, autonomous service boundaries, fault tolerance, and RESTful service-to-service communication.',
    },
    {
      name: 'Apache Kafka',
      isConfirmed: true,
      category: 'backend',
      description: 'Distributed event streaming, real-time message brokering, producer/consumer pipelines, and topic partitioning.',
    },
    {
      name: 'Hibernate & HQL',
      isConfirmed: true,
      category: 'backend',
      description: 'Object-Relational Mapping (ORM), entity lifecycle, caching, HQL queries, and database transaction management.',
    },
    {
      name: 'Design Patterns',
      isConfirmed: true,
      category: 'backend',
      description: 'Practical implementation of Singleton, Factory, Builder, DAO, and architectural separation of concerns.',
    },
    {
      name: 'REST APIs',
      isConfirmed: true,
      category: 'backend',
      description: 'HTTP resource modeling, payload validation, status envelopes, and seamless contract specifications.',
    },

    // --- Frontend Technologies (Verified from Resume) ---
    {
      name: 'React.js',
      isConfirmed: true,
      category: 'frontend',
      description: 'Component architecture, custom hooks, virtual DOM rendering, and client-side application state management.',
    },
    {
      name: 'React Redux',
      isConfirmed: true,
      category: 'frontend',
      description: 'Predictable centralized state container, action dispatchers, reducers, and global state synchronization.',
    },
    {
      name: 'Material UI (MUI)',
      isConfirmed: true,
      category: 'frontend',
      description: 'Production-ready component systems, responsive theming, data grids, and design system alignment.',
    },
    {
      name: 'JavaScript (ES6+)',
      isConfirmed: true,
      category: 'frontend',
      description: 'Modern asynchronous programming, closures, promises, event loop, and DOM manipulation.',
    },
    {
      name: 'TypeScript',
      isConfirmed: true,
      category: 'frontend',
      description: 'Static typing, interfaces, generics, and strict contract verification across full-stack applications.',
    },
    {
      name: 'HTML5 & CSS3 / Bootstrap',
      isConfirmed: true,
      category: 'frontend',
      description: 'Semantic markup, accessible responsive grid layouts, Flexbox, CSS animations, and cross-browser styling.',
    },
    {
      name: 'Node.js',
      isConfirmed: true,
      category: 'frontend',
      description: 'Server-side JavaScript runtime, package management, build scripting, and auxiliary micro-tooling.',
    },

    // --- Database Management (Verified from Resume) ---
    {
      name: 'PostgreSQL',
      isConfirmed: true,
      category: 'databases',
      description: 'Enterprise relational database design, indexing strategies, complex joins, and ACID transactional integrity.',
    },
    {
      name: 'Oracle Database',
      isConfirmed: true,
      category: 'databases',
      description: 'High-availability enterprise database, PL/SQL queries, table partitioning, and high-volume data storage.',
    },
    {
      name: 'MySQL',
      isConfirmed: true,
      category: 'databases',
      description: 'Relational data modeling, query optimization, database migrations, and connection pooling.',
    },
    {
      name: 'Redis',
      isConfirmed: true,
      category: 'databases',
      description: 'In-memory distributed key-value cache, session storage, and low-latency data access acceleration.',
    },

    // --- Cloud & DevOps (Verified from Resume) ---
    {
      name: 'Docker',
      isConfirmed: true,
      category: 'cloud',
      description: 'Container packaging, multi-stage lightweight image builds, layer caching, and isolated runtime environments.',
    },
    {
      name: 'Kubernetes',
      isConfirmed: true,
      category: 'cloud',
      description: 'Container orchestration, deployment manifests, pod scaling, service discovery, and rolling upgrades.',
    },
    {
      name: 'Amazon AWS (S3 & Cloud)',
      isConfirmed: true,
      category: 'cloud',
      description: 'Cloud document management, Amazon S3 storage integration, secure IAM access, and cloud workload hosting.',
    },
    {
      name: 'Jenkins CI/CD',
      isConfirmed: true,
      category: 'devops',
      description: 'Automated continuous integration pipelines, build triggers, automated test execution, and deployment stages.',
    },
    {
      name: 'Git & GitHub / SVN',
      isConfirmed: true,
      category: 'devops',
      description: 'Version control workflows, trunk-based development, branching strategies, and pull request reviews.',
    },
    {
      name: 'Maven',
      isConfirmed: true,
      category: 'devops',
      description: 'Java dependency management, build lifecycles, artifact packaging, and plugin configuration.',
    },

    // --- Testing, Quality & Observability (Verified from Resume) ---
    {
      name: 'Mockito & JUnit',
      isConfirmed: true,
      category: 'testing',
      description: 'Unit testing, mocked dependency isolation, test assertions, and integration test coverage across service layers.',
    },
    {
      name: 'Dynatrace APM',
      isConfirmed: true,
      category: 'quality',
      description: 'Application performance monitoring, distributed request tracing, latency bottleneck analysis, and service telemetry.',
    },
    {
      name: 'SonarLint / Code Quality',
      isConfirmed: true,
      category: 'quality',
      description: 'Static code analysis, vulnerability detection, code smell elimination, and continuous compliance adherence.',
    },
    {
      name: 'Confluent Kafka Control Center',
      isConfirmed: true,
      category: 'quality',
      description: 'Kafka cluster monitoring, consumer group lag inspection, topic configuration, and event stream verification.',
    },
  ],

  projects: [
    {
      id: 'cpc-income-tax-return-engine',
      title: 'Income Tax Return Processing Engine (CPC 2.0)',
      tagline: 'High-scale government return processing microservices platform with Spring Boot, Kafka, and Oracle.',
      category: 'Enterprise Microservices Platform',
      status: 'Production System',
      role: 'Back-end Developer',
      teamSize: 25,
      duration: 'August 2021 – Present (Infosys)',
      overview:
        'The Centralized Processing Center (CPC 2.0) is a mission-critical government tax computing platform designed as an integrated group of microservices to process millions of income tax filings from e-filing through complete Return Processing (RP) and accounting settlement.',
      problemStatement:
        'Processing nationwide tax returns requires extreme throughput, strict mathematical accuracy, zero data loss, and real-time reconciliation against massive TDS/TCS deduction datasets without bottlenecking the filing gateway.',
      proposedSolution:
        'Engineered an event-driven microservices architecture utilizing Spring Boot and Apache Kafka for asynchronous communication across decoupled computational stages: Data-Inwarding, Rule Validation, Tax Computation, TDS/TCS Matching, and Interest Computation.',
      keyFeatures: [
        'Data-Inwarding Microservice: Parses and ingests filed returns from the national E-file portal with schema validation.',
        'Validation Microservice: Executes business validation rules across diverse taxpayer categories and filing types.',
        'Tax Calculation Engine: Evaluates income brackets, deductions, and tax computations with strict statutory accuracy.',
        'TDS & TCS Matching Microservice: Reconciles claimed tax deductions against national tax withholding ledgers.',
        'Interest Computation Microservice: Automatically maintains business rules for statutory interest calculation and refund adjustments.',
        'High-Performance Datastores: Persistence across PostgreSQL and Oracle databases with Redis low-latency caching.',
        'Observability & Cluster Health: Monitored via Confluent Kafka Control Center, Dynatrace APM, and SonarLint quality gates.',
      ],
      architectureOverview:
        'Event-driven distributed architecture where tax filings trigger coordinated Kafka event streams across independent Spring Boot microservices backed by Oracle/Postgres persistence and deployed via Kubernetes.',
      architectureComponents: [
        {
          name: 'Data-Inwarding Service',
          type: 'service',
          tech: 'Java 11, Spring Boot 3, REST Ingestion',
          role: 'Receives filed tax returns from the external e-filing portal, performs payload sanity checks, and dispatches to Kafka topic.',
        },
        {
          name: 'Kafka Event Broker',
          type: 'broker',
          tech: 'Apache Kafka, Confluent Control Center',
          role: 'Decouples service processing pipeline, handles event partitioning and guaranteed delivery between tax stages.',
        },
        {
          name: 'Validation & Rules Service',
          type: 'service',
          tech: 'Spring Boot, Java 11, Hibernate',
          role: 'Evaluates tax eligibility constraints, deduction limits, and audit risk criteria.',
        },
        {
          name: 'Tax & Interest Computation Service',
          type: 'service',
          tech: 'Spring Boot, HQL, Redis Cache',
          role: 'Executes mathematical tax computation algorithms, calculates statutory interest, and determines refund/demand.',
        },
        {
          name: 'TDS/TCS Reconciliation Service',
          type: 'service',
          tech: 'Spring Boot, Oracle Database',
          role: 'Matches claimed tax credits against 26AS/withholding records at high scale.',
        },
        {
          name: 'Primary Enterprise Datastore',
          type: 'database',
          tech: 'Oracle DB, PostgreSQL 16',
          role: 'Persistent storage for tax computation results, audit histories, and accounting ledgers.',
        },
      ],
      techStack: {
        backend: ['Java 11', 'Spring Boot', 'Apache Kafka', 'Confluent Kafka', 'Hibernate', 'HQL', 'Mockito', 'TypeScript', 'Node.js'],
        frontend: ['Angular JS / React', 'HTML5', 'CSS3'],
        database: ['PostgreSQL', 'Oracle DB', 'Redis Cache'],
        infrastructure: ['Docker', 'Kubernetes', 'AWS'],
        testing: ['JUnit', 'Mockito', 'Defect Analysis across DEV, SIT, and UAT'],
        devops: ['Jenkins CI/CD', 'Git', 'Jira', 'SonarLint', 'Dynatrace APM'],
      },
      implementationHighlights: [
        'Event-Driven Choreography: Apache Kafka topics decouple each tax computation stage, preventing cascade failures and allowing independent autoscaling during seasonal peak filing deadlines.',
        'HQL & Hibernate Optimization: Designed normalized entities with optimized query execution plans in Oracle and PostgreSQL, reducing batch transaction latency.',
        'Robust Quality Engineering: Implemented unit tests, integration tests, and end-to-end tests with Mockito; actively resolved defects across DEV, SIT, and UAT environments.',
      ],
      testingStrategy: [
        'Comprehensive unit tests with Mockito to verify complex tax calculation formulas and boundary conditions.',
        'Integration testing across Kafka consumers and database persistence layers.',
        'Defect triage and regression bug fixing throughout multi-stage DEV, SIT, and UAT staging environments.',
      ],
      setupInstructions: {
        prerequisites: ['JDK 11 or higher', 'Docker Engine & Kubernetes CLI', 'Apache Kafka / Confluent CLI'],
        steps: [
          'Clone the microservices repository and review configuration in `application.yml`.',
          'Launch local Kafka and Oracle/PostgreSQL containers: `docker compose up -d zookeeper kafka postgres`.',
          'Start Data-Inwarding and Tax Computation services using Maven: `./mvnw spring-boot:run`.',
          'Monitor Kafka event streams via Confluent Control Center at http://localhost:9021.',
          'Verify health indicators via `/actuator/health`.',
        ],
        runCommand: 'docker compose -f docker-compose.cpc2.yml up --build',
      },
      endpointsSnippet: `POST /api/v1/returns/inward      -> 202 Accepted (Kafka event dispatched)
GET  /api/v1/returns/{pan}/status -> 200 OK (Current RP lifecycle stage)
POST /api/v1/tax/calculate        -> 200 OK (Tax liability computation payload)
POST /api/v1/matching/tds         -> 200 OK (TDS claimed vs deducted reconciliation)
GET  /actuator/health             -> 200 OK (Service liveness & Kafka probe)`,
      dockerComposeSnippet: `services:
  kafka:
    image: confluentinc/cp-kafka:7.5.0
    ports: ["9092:9092"]
    environment:
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092

  tax-calculation-service:
    build: ./services/tax-calc
    ports: ["8082:8082"]
    environment:
      KAFKA_BOOTSTRAP_SERVERS: kafka:9092
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/taxdb
    depends_on:
      - kafka
      - postgres`,
    },
    {
      id: 'soffront-cloud-crm-platform',
      title: 'SOFFRONT Multi-Tenant Cloud CRM Platform',
      tagline: 'Cloud-based SaaS CRM consolidating customer workflows, document management, and communication automation.',
      category: 'Cloud SaaS Platform',
      status: 'Production System',
      role: 'Full Stack Developer',
      teamSize: 15,
      duration: 'January 2019 – August 2021 (SOFFRONT Software)',
      overview:
        'SOFFRONT CRM is an enterprise cloud-based SaaS Customer Relationship Management system designed to consolidate customer data, track multi-channel interactions (email, calls, social), and automate sales, marketing, service, and operations hub workflows.',
      problemStatement:
        'SaaS customers struggled with fragmented customer communications, sluggish data access across legacy Spring JDBC layers, and manual effort tracking leads, document uploads, and scheduled follow-ups.',
      proposedSolution:
        'Architected full-stack capabilities combining Spring backend service layers and a responsive React.js/Redux SPA. Migrated legacy Spring JDBC data access to Hibernate ORM, integrated Amazon S3 for cloud document storage, and automated customer notifications using Twilio and SendGrid APIs.',
      keyFeatures: [
        'Web-Form / Landing Page Builder: Integrated Bee editor for drag-and-drop lead capture pages that feed directly into the CRM pipeline.',
        'Amazon S3 Document Management: Secure, scalable cloud storage for customer contracts, proposals, and attachments.',
        'Automated Workflow Scheduler: Background task engine sending email and popup reminders for appointments, tasks, and deal milestones.',
        'Multi-Channel Communications: Integrated Twilio API for automated SMS dispatch and SendGrid API for transactional email processing.',
        'Modern Responsive UI: Developed interactive dashboards with React.js, React Redux, Material UI, and JavaScript.',
        'DAO Layer Modernization: Successfully refactored and migrated database access logic from Spring JDBC to Hibernate.',
      ],
      architectureOverview:
        'Full-stack cloud application featuring a React Redux single-page application communicating via REST APIs with Spring service/process/integration layers backed by MySQL persistence and Amazon AWS S3.',
      architectureComponents: [
        {
          name: 'CRM Web Client',
          type: 'frontend',
          tech: 'React.js, React Redux, Material UI, JavaScript',
          role: 'Interactive user dashboard for managing leads, deals, tasks, customer histories, and communication logs.',
        },
        {
          name: 'Spring Service & Process Layer',
          type: 'service',
          tech: 'Java 8, Spring Framework, Hibernate',
          role: 'Executes core CRM business logic, validates pipeline state transitions, orchestrates scheduled jobs.',
        },
        {
          name: 'Third-Party Integration Layer',
          type: 'gateway',
          tech: 'Twilio API, SendGrid API, Bee Editor',
          role: 'Handles SMS notifications, transactional email dispatching, and inbound lead web-form ingestion.',
        },
        {
          name: 'Cloud Asset Repository',
          type: 'infra',
          tech: 'Amazon AWS S3',
          role: 'Stores customer attachments, contracts, and marketing media assets with secure pre-signed URLs.',
        },
        {
          name: 'Relational Database',
          type: 'database',
          tech: 'MySQL Database',
          role: 'Persistent storage for user profiles, customer records, workflow queues, and interaction histories.',
        },
      ],
      techStack: {
        backend: ['Java 8', 'Spring Framework', 'Hibernate', 'REST APIs', 'Spring JDBC Migration'],
        frontend: ['React.js', 'React Redux', 'Material UI', 'JavaScript', 'jQuery', 'HTML5', 'CSS3'],
        database: ['MySQL Database'],
        infrastructure: ['Amazon AWS S3', 'Windows Server / Linux'],
        testing: ['Unit Testing', 'API Integration Testing'],
        devops: ['Git', 'Maven', 'Task Schedulers'],
      },
      implementationHighlights: [
        'DAO Migration from Spring JDBC to Hibernate: Re-architected data access logic into clean entity mappings and Hibernate sessions, cutting boilerplate query code by 40%.',
        'Amazon S3 Integration: Built resilient document management allowing multi-tenant customers to upload, download, and archive customer attachments securely.',
        'Communication Gateways: Seamlessly integrated SendGrid and Twilio APIs with an automated Spring scheduler for reliable reminder delivery.',
      ],
      testingStrategy: [
        'Unit testing of CRM workflow triggers and scheduler rules.',
        'Integration testing of third-party API adapters (SendGrid, Twilio, Amazon S3).',
        'Regression testing during DAO migration to guarantee zero data inconsistency in MySQL.',
      ],
      setupInstructions: {
        prerequisites: ['JDK 8 or higher', 'MySQL Server 8', 'Node.js & npm', 'AWS Credentials (S3)'],
        steps: [
          'Configure database connection in `application.properties`: `spring.datasource.url=jdbc:mysql://localhost:3306/crm_db`.',
          'Execute Maven build: `mvn clean package`.',
          'Launch Spring backend server.',
          'Navigate to client directory and run `npm install && npm start` to open the React Redux dashboard.',
        ],
        runCommand: 'mvn spring-boot:run & cd client && npm start',
      },
      endpointsSnippet: `POST /api/leads/capture            -> 201 Created (Lead saved from Web-form)
GET  /api/customers/{id}/timeline  -> 200 OK (Full interaction history: calls/emails/sms)
POST /api/documents/upload         -> 200 OK (Amazon S3 upload & URL generation)
POST /api/notifications/sms        -> 200 OK (Twilio SMS queued)
POST /api/notifications/email      -> 200 OK (SendGrid email dispatch)`,
      dockerComposeSnippet: `services:
  crm-backend:
    build: .
    ports: ["8080:8080"]
    environment:
      AWS_S3_BUCKET: soffront-crm-docs
      MYSQL_URL: jdbc:mysql://db:3306/crm_db
    depends_on:
      - db

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: crm_db
    ports: ["3306:3306"]`,
    },
    {
      id: 'automated-cicd-kubernetes-pipeline',
      title: 'Automated CI/CD & Kubernetes Cloud Pipeline',
      tagline: 'End-to-end automation with Jenkins, Maven, Docker, and Kubernetes deployment.',
      category: 'DevOps & Cloud Infrastructure',
      status: 'Production System',
      role: 'DevOps / Backend Integration',
      teamSize: 25,
      duration: 'Ongoing Architecture',
      overview:
        'A resilient enterprise CI/CD automation and container orchestration pipeline powering multi-service Spring Boot and React applications with automated test execution, static code analysis, Docker image packaging, and Kubernetes deployment.',
      problemStatement:
        'Deploying distributed microservices manually introduces human error, deployment downtime, undetected regressions, and inconsistent environment configurations across DEV, SIT, and UAT stages.',
      proposedSolution:
        'Architected an automated delivery pipeline using Jenkins, Maven, Docker, and Kubernetes. Integrates SonarLint code quality gates, automated Mockito/JUnit test execution, and Dynatrace APM telemetry for continuous health verification.',
      keyFeatures: [
        'Automated Test Verification: Executes Maven Surefire test suites with JUnit and Mockito on every commit.',
        'SonarLint & Quality Assurance: Enforces code quality, security rules, and code smell thresholds before staging.',
        'Multi-Stage Docker Packaging: Produces lightweight, secure container images.',
        'Kubernetes Cluster Orchestration: Deploys containerized pods with rolling updates, service discovery, and health probes.',
        'Application Performance Telemetry: Integrated with Dynatrace APM for real-time latency and trace monitoring.',
      ],
      architectureOverview:
        'Declarative pipeline: Git Commit -> Jenkins Pipeline -> Maven Build & Mockito Tests -> SonarLint Quality Gate -> Docker Build -> Kubernetes Cluster Rolling Deployment -> Dynatrace Telemetry.',
      architectureComponents: [
        {
          name: 'Source Version Control',
          type: 'infra',
          tech: 'Git, GitHub, SVN',
          role: 'Manages multi-branch development, pull request verification, and commit triggers.',
        },
        {
          name: 'Jenkins CI/CD Automation',
          type: 'service',
          tech: 'Jenkins Pipeline, Maven',
          role: 'Orchestrates build automation, compiles Java 11 artifacts, runs test suites, manages artifacts.',
        },
        {
          name: 'Containerization Engine',
          type: 'infra',
          tech: 'Docker Engine',
          role: 'Builds immutable container images with isolated dependencies and minimal attack surfaces.',
        },
        {
          name: 'Orchestration & Runtime',
          type: 'infra',
          tech: 'Kubernetes (K8s)',
          role: 'Manages container lifecycles, load balancing, liveness/readiness probes, and self-healing pods.',
        },
        {
          name: 'Observability & Monitoring',
          type: 'service',
          tech: 'Dynatrace APM, Confluent Control Center',
          role: 'Monitors real-time service health, transaction tracing, and resource utilization across nodes.',
        },
      ],
      techStack: {
        backend: ['Java 11', 'Maven', 'Spring Boot'],
        frontend: ['React Build Tools', 'Node.js'],
        infrastructure: ['Docker', 'Kubernetes', 'AWS'],
        testing: ['JUnit', 'Mockito', 'SonarLint'],
        devops: ['Jenkins CI/CD', 'Git', 'Jira', 'Dynatrace'],
      },
      implementationHighlights: [
        'Automated Quality Gate: Commits failing unit tests or SonarLint security checks are automatically halted in Jenkins, preventing bad code from reaching SIT or UAT.',
        'Zero-Downtime Rolling Updates: Kubernetes deployment manifests leverage rolling update strategies with configured readiness probes to maintain continuous service availability.',
        'APM Telemetry: Dynatrace integration pinpoints inter-service communication latency and database query bottlenecks in real time.',
      ],
      testingStrategy: [
        'Automated pre-merge verification running complete unit and slice test suites.',
        'Smoke testing of deployed Kubernetes pods against `/actuator/health` endpoints.',
      ],
      setupInstructions: {
        prerequisites: ['Jenkins Server', 'Docker Engine', 'Kubectl configured for cluster'],
        steps: [
          'Configure Jenkinsfile pipeline definition in the project root.',
          'Set up webhook triggers on GitHub/Git repository.',
          'Configure Kubernetes service account credentials in Jenkins secret store.',
          'Trigger pipeline to observe automated build, test, and container push.',
        ],
        runCommand: 'mvn clean verify && docker build -t service:latest .',
      },
      endpointsSnippet: `Pipeline Deployment Sequence:
1. Stage: Checkout Code from Git
2. Stage: Maven Compile & Mockito Unit Tests
3. Stage: SonarLint Quality & Security Gate
4. Stage: Docker Multi-stage Container Build
5. Stage: Deploy to Kubernetes Cluster (Rolling Update)
6. Stage: Dynatrace Health & Latency Verification`,
      dockerComposeSnippet: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: microservice-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: microservice
  template:
    metadata:
      labels:
        app: microservice
    spec:
      containers:
      - name: app
        image: app-service:latest
        ports:
        - containerPort: 8080
        readinessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 10`,
    },
  ],

  // Verified Work Experience from Resume (100% accurate, no placeholders!)
  experience: [
    {
      company: 'Infosys',
      role: 'Technology Analyst',
      location: 'Bangalore, India',
      period: 'August 2021 – Present',
      highlights: [
        'Design, develop, and maintain high-performance microservices-based applications following industry best practices for scalability, modularity, and fault tolerance.',
        'Architect event-driven distributed systems and real-time data streaming pipelines using Apache Kafka and Confluent Kafka Control Center for inter-service communication.',
        'Design normalized schemas and write optimized HQL queries using Hibernate ORM across PostgreSQL and Oracle databases.',
        'Implement automated CI/CD pipelines using Jenkins, Docker, and Kubernetes for containerized service delivery.',
        'Develop and maintain unit tests, integration tests, and end-to-end tests using Mockito and JUnit, conducting defect analysis and bug fixing across DEV, SIT, and UAT environments.',
        'Collaborate closely with cross-functional teams, including product managers, architects, and frontend developers in Agile/Scrum delivery sprints.',
      ],
      technologies: [
        'Java 11',
        'Spring Boot',
        'Microservices',
        'Apache Kafka',
        'Hibernate',
        'PostgreSQL',
        'Oracle',
        'Redis',
        'Docker',
        'Kubernetes',
        'Jenkins',
        'Dynatrace',
        'SonarLint',
        'Mockito',
      ],
      isPlaceholder: false,
    },
    {
      company: 'SOFFRONT Software Pvt Ltd',
      role: 'Jr Java Developer / Full Stack Developer',
      location: 'Kolkata, India',
      period: 'January 2019 – August 2021',
      highlights: [
        'Engineered full-stack features for SOFFRONT CRM, a cloud-based multi-tenant SaaS Customer Relationship Management platform.',
        'Developed backend service, business process, and integration layers in Java and Spring Framework.',
        'Led key database architecture refactoring, migrating DAO logic from Spring JDBC to Hibernate ORM, improving code maintainability and execution performance.',
        'Built interactive, responsive single-page web interfaces using React.js, React Redux, Material UI, JavaScript, and Bootstrap.',
        'Integrated cloud document management using Amazon AWS S3 for secure customer file and contract storage.',
        'Implemented automated multi-channel messaging engines using Twilio API (SMS dispatch) and SendGrid API (transactional email processing) with background schedulers.',
        'Interacted regularly with enterprise clients to analyze business needs and deliver customized CRM workflow capabilities.',
      ],
      technologies: [
        'Java 8',
        'Spring Framework',
        'Hibernate',
        'React.js',
        'React Redux',
        'Material UI',
        'JavaScript',
        'MySQL',
        'Amazon AWS S3',
        'Twilio API',
        'SendGrid API',
        'Maven',
        'Git',
      ],
      isPlaceholder: false,
    },
  ],

  // Verified Education from Resume (100% accurate, no placeholders!)
  education: [
    {
      degree: 'B-Tech in Computer Science and Engineering (CSE)',
      institution: 'Biju Patnaik University of Technology (BPUT), Odisha',
      period: '2012 – 2016',
      details: 'Graduated with 7.1 CGPA. Strong foundation in Data Structures, Algorithms, Software Engineering, Object-Oriented Programming with Java, and Database Systems.',
      isPlaceholder: false,
    },
    {
      degree: 'Intermediate (+2 Science)',
      institution: 'Council of Higher Secondary Education (CHSE), Odisha',
      period: '2010 – 2012',
      details: 'Graduated with 68%. Core coursework in Physics, Chemistry, Mathematics, and Computer Science.',
      isPlaceholder: false,
    },
    {
      degree: 'High School Certificate (HSC / 10th Class)',
      institution: 'Board of Secondary Education (BSE), Odisha',
      period: '2010',
      details: 'Completed with 76% marks with strong foundation in Mathematics and Sciences.',
      isPlaceholder: false,
    },
  ],

  certifications: [
    {
      title: 'Microservices Architecture & Spring Boot Engineering',
      issuer: 'Infosys Competency Certification',
      date: '2022',
      isPlaceholder: false,
    },
    {
      title: 'Apache Kafka Event Streaming Developer',
      issuer: 'Confluent / Enterprise Training',
      date: '2023',
      isPlaceholder: false,
    },
  ],
};
