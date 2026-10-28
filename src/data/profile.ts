import type { ProfileData } from '../types/portfolio';

/**
 * ============================================================================
 * CENTRAL PROFILE DATA CONFIGURATION
 * ============================================================================
 * Updated with verified information from Rabinarayan Asha's professional resume.
 */

export const profileData: ProfileData = {
  name: 'Rabinarayan Asha',
  fallbackTitle: 'Senior Software Engineer',
  targetRole: 'Senior Software Engineer / Full Stack & AWS Cloud Architect',
  totalExperience: '6+ Years',
  location: 'Bhubaneswar, India',
  phone: '+91-8249067001',
  email: 'rabinarayanasha@gmail.com',

  headline: 'Engineering Cloud-Native Systems. Building Java 21 Microservices & AWS.',
  supportingCopy:
    'Senior Software Engineer at Accenture with 6+ years of experience specializing in Java 21, Spring Boot 3, Microservices architecture, React.js, and enterprise AWS Cloud Infrastructure (Amazon EKS, EC2, Elastic Beanstalk, RDS Postgres, SQS/SNS, CloudFront CDN, Route 53, VPC/NAT, CloudWatch, Lambda, and GitLab CI/CD).',

  socialLinks: {
    github: 'https://github.com/sameerasha',
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
      'Senior Software Engineer and Full Stack Cloud Architect with 6+ years of expertise in designing and deploying enterprise Microservices architectures using Java 21, Spring Boot 3, and React.js, backed by end-to-end AWS Cloud Infrastructure across Amazon EKS, EC2, Elastic Beanstalk, RDS PostgreSQL, SQS, SNS, and GitLab CI/CD.',
    bodyParagraph:
      'Currently serving at Accenture in Bhubaneswar, I architect and build enterprise-scale cloud microservices using Java 21, Spring Boot 3, and React.js. My technical foundation spans end-to-end AWS cloud engineering (EC2, Elastic Beanstalk, CloudFront CDN, RDS PostgreSQL Multi-AZ, SQS & SNS messaging, ALB load balancers, Route 53, IAM security, S3 buckets, VPC with public/private subnets and NAT gateways, CloudWatch, Lambda, ACM, KMS, Docker, Kubernetes, and Amazon EKS) with automated GitLab CI/CD pipelines. Previously, I served as a Technology Analyst at Infosys developing CPC 2.0 national tax return processing microservices and as a Full Stack Developer at SOFFRONT Software.',
    focusAreas: [
      {
        title: 'Backend Systems & Microservices',
        description:
          'Engineering resilient, decoupled microservices with Java 21, Spring Boot 3, Hibernate ORM, and REST APIs featuring circuit breakers, asynchronous processing, and clean architectural separation.',
        skills: ['Java 21', 'Spring Boot 3', 'Microservices', 'REST APIs', 'Design Patterns', 'Hibernate'],
      },
      {
        title: 'Cloud, Containers & DevOps',
        description:
          'Designing secure AWS cloud environments with Amazon EKS, EC2, Elastic Beanstalk, VPC (Multi-AZ subnets & NAT), CloudFront CDN, Route 53, SQS, SNS, Lambda, CloudWatch, Docker, and GitLab CI/CD.',
        skills: ['AWS (EKS, EC2, RDS, S3)', 'Docker & Kubernetes', 'GitLab CI/CD', 'VPC & NAT', 'CloudWatch', 'Lambda'],
      },
      {
        title: 'Modern Frontend Engineering',
        description:
          'Crafting high-performance, responsive single-page applications and dashboards with React.js, React Redux, TypeScript, Material UI, and modern styling architectures.',
        skills: ['React.js', 'TypeScript', 'React Redux', 'JavaScript', 'HTML5/CSS3', 'Material UI'],
      },
      {
        title: 'Persistence & Data Modeling',
        description:
          'Managing high-availability relational persistence across Amazon RDS (PostgreSQL), Oracle 19c, MySQL, and ElastiCache Redis, with automated backups, KMS encryption, and S3 data lakes.',
        skills: ['Amazon RDS (Postgres)', 'Oracle DB', 'MySQL', 'Redis Cache', 'Amazon S3', 'Flyway / HQL'],
      },
    ],
  },

  skills: [
    // --- Backend & Core Languages ---
    {
      name: 'Java (21, 11 & 8)',
      isConfirmed: true,
      category: 'backend',
      description: 'Modern Java 21 features (virtual threads, record patterns, pattern matching), Java 11/8, streams, concurrency, and memory management.',
    },
    {
      name: 'Spring Boot 3',
      isConfirmed: true,
      category: 'backend',
      description: 'Enterprise framework for building production-grade microservices, dependency injection, Spring Security, and actuator health monitoring.',
    },
    {
      name: 'Microservices Architecture',
      isConfirmed: true,
      category: 'backend',
      description: 'Domain decomposition, autonomous service boundaries, fault tolerance, API gateways, and RESTful inter-service communication.',
    },
    {
      name: 'Apache Kafka',
      isConfirmed: true,
      category: 'backend',
      description: 'Distributed event streaming, real-time message brokering, producer/consumer pipelines, and topic partitioning.',
    },
    {
      name: 'Hibernate & JPA',
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
      description: 'HTTP resource modeling, payload validation, status envelopes, and seamless OpenAPI contract specifications.',
    },

    // --- Frontend Technologies ---
    {
      name: 'React.js',
      isConfirmed: true,
      category: 'frontend',
      description: 'Modern component architecture, custom hooks, virtual DOM rendering, and client-side application state management.',
    },
    {
      name: 'TypeScript',
      isConfirmed: true,
      category: 'frontend',
      description: 'Static typing, interfaces, generics, and strict contract verification across full-stack applications.',
    },
    {
      name: 'React Redux & Toolkit',
      isConfirmed: true,
      category: 'frontend',
      description: 'Predictable centralized state container, RTK slices, action dispatchers, reducers, and global state synchronization.',
    },
    {
      name: 'JavaScript (ES6+)',
      isConfirmed: true,
      category: 'frontend',
      description: 'Modern asynchronous programming, async/await, closures, promises, event loop, and DOM manipulation.',
    },
    {
      name: 'HTML5 & CSS3 / Tailwind / MUI',
      isConfirmed: true,
      category: 'frontend',
      description: 'Semantic markup, accessible responsive grid layouts, Tailwind CSS, Material UI (MUI), Flexbox, and CSS animations.',
    },
    {
      name: 'Node.js',
      isConfirmed: true,
      category: 'frontend',
      description: 'Server-side JavaScript runtime, package management, build scripting, and auxiliary micro-tooling.',
    },

    // --- Database Management & Persistence ---
    {
      name: 'Amazon RDS (PostgreSQL)',
      isConfirmed: true,
      category: 'databases',
      description: 'Enterprise relational database design, Multi-AZ failover, indexing strategies, complex joins, and ACID transactional integrity.',
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
      name: 'Redis Cache',
      isConfirmed: true,
      category: 'databases',
      description: 'In-memory distributed key-value cache, session storage, and low-latency data access acceleration.',
    },

    // --- AWS Cloud & Containers ---
    {
      name: 'Amazon EKS (Kubernetes)',
      isConfirmed: true,
      category: 'cloud',
      description: 'Managed Kubernetes on AWS, container orchestration, deployment manifests, pod autoscaling, Helm charts, and IAM Roles for Service Accounts (IRSA).',
    },
    {
      name: 'AWS EC2 & Elastic Beanstalk',
      isConfirmed: true,
      category: 'cloud',
      description: 'Elastic Compute Cloud instances, autoscaling groups, application tier deployment, and managed Beanstalk environments.',
    },
    {
      name: 'Amazon CloudFront (CDN) & Route 53',
      isConfirmed: true,
      category: 'cloud',
      description: 'Global edge content delivery, latency-based DNS routing, Origin Access Control (OAC), and health-checked endpoints.',
    },
    {
      name: 'Amazon SQS & SNS',
      isConfirmed: true,
      category: 'cloud',
      description: 'Decoupled asynchronous messaging, FIFO queues, dead-letter queue (DLQ) processing, and pub/sub topic fan-out.',
    },
    {
      name: 'Amazon VPC, Subnets & NAT',
      isConfirmed: true,
      category: 'cloud',
      description: 'Multi-AZ Virtual Private Cloud design, public/private subnet isolation, NAT Gateways, Internet Gateways, and CIDR planning.',
    },
    {
      name: 'Amazon S3 Buckets',
      isConfirmed: true,
      category: 'cloud',
      description: 'Scalable object storage, data lake buckets, lifecycle management, pre-signed URLs, and server-side encryption.',
    },
    {
      name: 'AWS Lambda',
      isConfirmed: true,
      category: 'cloud',
      description: 'Serverless event-driven compute functions, event source mapping, and micro-task execution.',
    },
    {
      name: 'AWS IAM, Security Groups & KMS',
      isConfirmed: true,
      category: 'cloud',
      description: 'Identity & Access Management policies, customer-managed KMS encryption keys, and fine-grained Security Group firewall rules.',
    },
    {
      name: 'AWS Certificate Manager (ACM)',
      isConfirmed: true,
      category: 'cloud',
      description: 'Automated SSL/TLS certificate provisioning, renewal, and HTTPS termination at ALB and CloudFront.',
    },
    {
      name: 'Docker',
      isConfirmed: true,
      category: 'cloud',
      description: 'Container packaging, multi-stage lightweight image builds, layer caching, and isolated runtime environments.',
    },

    // --- DevOps & Automation ---
    {
      name: 'GitLab CI/CD',
      isConfirmed: true,
      category: 'devops',
      description: 'Automated continuous integration and deployment pipelines, GitLab runners, Docker image registries, and automated Helm deployment.',
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

    // --- Testing, Quality & Observability ---
    {
      name: 'Mockito & JUnit 5',
      isConfirmed: true,
      category: 'testing',
      description: 'Unit testing, mocked dependency isolation, test assertions, and integration test coverage across service layers.',
    },
    {
      name: 'Amazon CloudWatch',
      isConfirmed: true,
      category: 'quality',
      description: 'Real-time metrics, alarms, dashboard telemetry, log group aggregation, and container insights.',
    },
    {
      name: 'Dynatrace APM',
      isConfirmed: true,
      category: 'quality',
      description: 'Application performance monitoring, distributed request tracing, latency bottleneck analysis, and service telemetry.',
    },
    {
      name: 'SonarLint & SonarQube',
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
      duration: 'August 2021 – 2024 (Infosys)',
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
      id: 'aws-3tier-springboot-microservices',
      title: 'Production-Ready AWS 3-Tier Architecture for Spring Boot Microservices',
      tagline: 'Multi-AZ enterprise cloud architecture with React TypeScript, Spring Boot 3, Amazon EKS, PostgreSQL, and Terraform.',
      category: 'AWS Cloud & Kubernetes Architecture',
      status: 'Production System',
      role: 'Senior Software Engineer',
      teamSize: 20,
      duration: '2024 – Present (Accenture)',
      overview:
        'A secure, scalable, highly available enterprise AWS cloud microservices architecture engineered at Accenture separating presentation (React TypeScript SPA on S3 + CloudFront CDN with OAC and Route 53), application (Spring Boot 3 microservices with Java 21 on Amazon EKS, EC2, and Elastic Beanstalk), and data tiers (Amazon RDS PostgreSQL Multi-AZ and ElastiCache Redis in isolated database subnets). Decoupled via Amazon SQS and SNS, secured with IAM, KMS, Security Groups, and automated with GitLab CI/CD pipelines.',
      problemStatement:
        'Modern enterprise microservices require physical multi-tier network isolation, automated scaling during seasonal surges, zero credential leakage, and seamless CI/CD delivery without exposing database or application nodes directly to the public internet.',
      proposedSolution:
        'Architected a 3-tier AWS architecture across 2 Availability Zones (public subnets for ALB/NAT, private app subnets for EKS worker nodes & EC2, private database subnets for RDS/Redis). Integrated AWS WAF, Route 53, CloudFront OAC, AWS Load Balancer Controller, AWS Secrets Manager automated rotation, AWS Lambda serverless triggers, and automated GitLab CI/CD pipelines.',
      keyFeatures: [
        'Tier 1: Presentation Tier — React.js TypeScript SPA compiled and hosted on private Amazon S3, distributed globally via CloudFront CDN with Origin Access Control (OAC), Route 53 latency routing, ACM TLS 1.3, and AWS WAF bot mitigation.',
        'Tier 2: Application Tier — Autonomous Spring Boot 3 / Java 21 microservices containerized with Docker, deployed on Amazon EKS, EC2, and Elastic Beanstalk with autoscaling and IAM Roles for Service Accounts (IRSA).',
        'Tier 3: Data Tier — Amazon RDS for PostgreSQL in isolated private database subnets with Multi-AZ automated failover, KMS encryption at rest and in transit, and automated 30-day credential rotation via AWS Secrets Manager.',
        'High-Speed Caching & Asynchronous Messaging — Amazon ElastiCache for Redis cluster for hot session cache; Amazon SQS FIFO and SNS fan-out for decoupled event-driven processing.',
        'Infrastructure as Code (IaC) & Serverless — Modular Terraform codebase managing VPC, subnets, NAT gateways, EKS, ALB, RDS, and security groups; AWS Lambda for event-driven serverless tasks.',
      ],
      architectureOverview:
        'Multi-AZ 3-Tier Pipeline: Client -> Route 53 -> CloudFront/S3 (Frontend) | API Path (/api/v1/*) -> AWS WAF -> ALB (Public Subnet) -> Amazon EKS & EC2 Spring Boot Pods (Private App Subnet) -> Amazon RDS PostgreSQL & ElastiCache Redis (Private DB Subnet) -> SQS/SNS -> CloudWatch & Lambda.',
      architectureComponents: [
        {
          name: 'Presentation Tier (CloudFront + S3)',
          type: 'frontend',
          tech: 'React.js, TypeScript, CloudFront OAC, Route 53, ACM',
          role: 'Serves static SPA assets with edge caching, sub-millisecond CDN delivery, and HTTPS redirection.',
        },
        {
          name: 'Application Load Balancer (ALB)',
          type: 'gateway',
          tech: 'AWS ALB, Ingress Controller, AWS WAF',
          role: 'Terminates TLS 1.3, applies WAF rate limits, and routes API requests to EKS target groups.',
        },
        {
          name: 'Application Tier (Amazon EKS & EC2)',
          type: 'service',
          tech: 'Spring Boot 3, Java 21, Kubernetes, Docker, Elastic Beanstalk',
          role: 'Orchestrates containerized microservices (Auth, User, Order, Notification, File) with HPA and Karpenter.',
        },
        {
          name: 'Data Tier (Amazon RDS PostgreSQL)',
          type: 'database',
          tech: 'PostgreSQL 16, Multi-AZ Standby, Flyway, HikariCP',
          role: 'ACID transactional persistence in isolated database subnets with point-in-time recovery and KMS encryption.',
        },
        {
          name: 'In-Memory Cache (Amazon ElastiCache)',
          type: 'infra',
          tech: 'Redis 7.2 Cluster, Spring Data Redis',
          role: 'Sub-millisecond caching for computational entities, session state, and distributed rate limiting.',
        },
        {
          name: 'Asynchronous Messaging (SQS & SNS)',
          type: 'broker',
          tech: 'AWS SQS FIFO, Amazon SNS, EventBridge, Lambda',
          role: 'Decouples order processing and notification workflows with dead-letter queue (DLQ) fault tolerance.',
        },
      ],
      techStack: {
        backend: ['Java 21', 'Spring Boot 3', 'Spring Security (JWT)', 'Spring Data JPA', 'Hibernate', 'Flyway', 'Maven'],
        frontend: ['React.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Axios', 'Jest'],
        database: ['Amazon RDS for PostgreSQL 16', 'Amazon ElastiCache for Redis', 'Amazon S3 Data Lake'],
        infrastructure: ['Amazon EKS (Kubernetes)', 'AWS EC2', 'AWS Elastic Beanstalk', 'Amazon VPC (Multi-AZ & NAT)', 'ALB', 'CloudFront (CDN)', 'Route 53', 'AWS Lambda', 'AWS ACM', 'AWS KMS', 'AWS IAM & Security Groups', 'Terraform'],
        testing: ['JUnit 5', 'Mockito', 'SonarQube Quality Gate', 'EKS Health Probes'],
        devops: ['GitLab CI/CD Pipelines', 'GitHub Actions', 'Helm Charts', 'Amazon ECR', 'Docker Multi-stage', 'CloudWatch', 'AWS X-Ray'],
      },
      implementationHighlights: [
        'Complete Multi-AZ Network Isolation: One VPC (10.0.0.0/16) across 2 AZs with public subnets (ALB, NAT), private application subnets (EKS), and strictly isolated private database subnets without internet routes.',
        'Zero-Credential Architecture: Pods authenticate with AWS services using IAM Roles for Service Accounts (IRSA); database credentials rotate automatically every 30 days via AWS Secrets Manager.',
        'Automated CI/CD with GitOps: GitHub Actions executes Maven unit tests, SonarQube quality gates, Docker multi-stage builds, ECR vulnerability scanning, and automated Helm upgrades on EKS.',
      ],
      testingStrategy: [
        'Automated pre-merge unit and slice tests with JUnit 5 and Mockito.',
        'Container vulnerability scanning with Trivy/ECR before deployment.',
        'Kubernetes rolling update smoke testing against Spring Boot Actuator `/actuator/health` probes.',
      ],
      setupInstructions: {
        prerequisites: ['AWS CLI v2 & configured credentials', 'Terraform >= 1.9', 'Kubectl & Helm v3', 'Docker Engine'],
        steps: [
          'Deploy multi-tier VPC and networking via Terraform: `cd terraform/environments/prod && terraform apply`.',
          'Build and push Spring Boot container images to Amazon ECR: `docker build -t $ECR_REGISTRY/order-service:v1 . && docker push`.',
          'Deploy application Helm charts to EKS: `helm upgrade --install microservices ./helm/microservices -n production`.',
          'Deploy React SPA frontend to private S3 and invalidate CloudFront: `aws s3 sync dist/ s3://prod-web-bucket && aws cloudfront create-invalidation --paths "/*"`.',
          'Verify end-to-end telemetry via CloudWatch Container Insights and AWS X-Ray service maps.',
        ],
        runCommand: 'terraform apply -auto-approve && helm upgrade --install microservices ./helm',
      },
      endpointsSnippet: `Presentation & API Ingress Routes:
GET  https://domain.com/                    -> 200 OK (CloudFront OAC -> React SPA on S3)
POST https://domain.com/api/v1/auth/login   -> 200 OK (Auth Service -> JWT Token Issued)
GET  https://domain.com/api/v1/users/me     -> 200 OK (User Service -> Authenticated Profile)
POST https://domain.com/api/v1/orders       -> 201 Created (Order Service -> RDS Commit + SQS Event)
POST https://domain.com/api/v1/files/upload -> 200 OK (File Service -> S3 Pre-signed URL)
GET  https://domain.com/actuator/health     -> 200 OK (Liveness/Readiness: RDS & Redis UP)`,
      dockerComposeSnippet: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: order-service
  template:
    metadata:
      labels:
        app: order-service
    spec:
      serviceAccountName: order-service-sa
      containers:
        - name: order-service
          image: 123456789012.dkr.ecr.us-east-1.amazonaws.com/order-service:latest
          ports:
            - containerPort: 8080
          resources:
            requests: { cpu: "250m", memory: "512Mi" }
            limits: { cpu: "1000m", memory: "1024Mi" }
          readinessProbe:
            httpGet: { path: /actuator/health/readiness, port: 8080 }
            initialDelaySeconds: 20
          livenessProbe:
            httpGet: { path: /actuator/health/liveness, port: 8080 }
            initialDelaySeconds: 30`,
    },
  ],

  // Verified Work Experience (Accenture, Infosys, SOFFRONT)
  experience: [
    {
      company: 'Accenture',
      role: 'Senior Software Engineer',
      location: 'Bhubaneswar, India',
      period: '2024 – Present',
      highlights: [
        'Architect and develop enterprise-scale microservices using Java 21, Spring Boot 3, and React.js with asynchronous processing, clean domain-driven boundaries, and fault tolerance.',
        'Design and deploy multi-tier cloud infrastructure on AWS: containerized workloads across Amazon EKS (Kubernetes), EC2 compute instances, and AWS Elastic Beanstalk.',
        'Configure highly available persistence with Amazon RDS (PostgreSQL) Multi-AZ, automated snapshots, KMS encryption at rest, and Amazon S3 bucket object storage.',
        'Implement resilient asynchronous messaging architectures leveraging Amazon SQS (FIFO queues, dead-letter queues) and Amazon SNS topic fan-out pipelines.',
        'Design secure enterprise networking topologies: Amazon VPC with public and private subnets, NAT Gateways, Internet Gateways, Security Groups, and network ACLs.',
        'Orchestrate global edge delivery and DNS routing via Amazon CloudFront (CDN), Route 53 latency-based routing, and TLS/SSL certificate automation with AWS Certificate Manager (ACM).',
        'Enforce least-privilege security posture utilizing AWS IAM roles and policies, AWS KMS customer-managed encryption keys, and fine-grained Security Group ingress/egress rules.',
        'Deploy serverless event-driven micro-functions with AWS Lambda and real-time observability via Amazon CloudWatch metrics, alarms, and log groups.',
        'Build and maintain automated CI/CD pipelines in GitLab CI/CD with Docker containerization, automated unit/integration test suites, and GitOps deployments onto Amazon EKS.',
      ],
      technologies: [
        'Java 21',
        'Spring Boot 3',
        'Microservices',
        'React.js',
        'Amazon EKS',
        'Kubernetes',
        'Docker',
        'AWS EC2',
        'Elastic Beanstalk',
        'Amazon RDS (PostgreSQL)',
        'Amazon SQS & SNS',
        'CloudFront (CDN)',
        'Route 53',
        'AWS Lambda',
        'Amazon S3',
        'Amazon VPC & NAT',
        'AWS IAM & KMS',
        'AWS Certificate Manager (ACM)',
        'CloudWatch',
        'GitLab CI/CD',
      ],
      isPlaceholder: false,
    },
    {
      company: 'Infosys',
      role: 'Technology Analyst',
      location: 'Bangalore, India',
      period: 'August 2021 – 2024',
      highlights: [
        'Designed, developed, and maintained high-performance microservices-based applications for the national Income Tax Return Processing Engine (CPC 2.0).',
        'Architected event-driven distributed systems and real-time data streaming pipelines using Apache Kafka and Confluent Kafka Control Center for inter-service communication.',
        'Designed normalized schemas and wrote optimized HQL queries using Hibernate ORM across PostgreSQL and Oracle databases with Redis caching.',
        'Implemented automated CI/CD pipelines using Jenkins, Docker, and Kubernetes for containerized service delivery.',
        'Developed and maintained unit tests, integration tests, and end-to-end tests using Mockito and JUnit, conducting defect analysis across DEV, SIT, and UAT environments.',
        'Collaborated closely with cross-functional architecture and product delivery teams in Agile/Scrum delivery sprints.',
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
        'Jenkins CI/CD',
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
