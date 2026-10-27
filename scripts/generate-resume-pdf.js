import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generatePDF() {
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Helper to add a page
  const addPage = () => {
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    return page;
  };

  // --- PAGE 1 ---
  let page = addPage();
  const { width, height } = page.getSize();
  let y = height - 50;

  const drawHeader = () => {
    page.drawText('Rabinarayan Asha', {
      x: 50,
      y,
      size: 24,
      font: fontBold,
      color: rgb(0.06, 0.09, 0.16),
    });
    y -= 18;

    page.drawText('Full Stack Developer / Java Microservices Engineer  |  4.9+ Yrs Experience', {
      x: 50,
      y,
      size: 11,
      font: fontBold,
      color: rgb(0.01, 0.52, 0.78),
    });
    y -= 16;

    page.drawText('Email: rabinarayanasha@gmail.com  |  Phone: +91-8249067001  |  Bangalore, India', {
      x: 50,
      y,
      size: 9.5,
      font: fontRegular,
      color: rgb(0.25, 0.3, 0.4),
    });
    y -= 14;

    page.drawLine({
      start: { x: 50, y },
      end: { x: width - 50, y },
      thickness: 1.5,
      color: rgb(0.01, 0.52, 0.78),
    });
    y -= 20;
  };

  const drawSectionTitle = (title) => {
    if (y < 80) {
      page = addPage();
      y = height - 50;
    }
    page.drawText(title.toUpperCase(), {
      x: 50,
      y,
      size: 11.5,
      font: fontBold,
      color: rgb(0.01, 0.52, 0.78),
    });
    y -= 4;
    page.drawLine({
      start: { x: 50, y },
      end: { x: width - 50, y },
      thickness: 0.5,
      color: rgb(0.8, 0.85, 0.9),
    });
    y -= 14;
  };

  const drawParagraph = (text, size = 9, indent = 50, lineSpacing = 13) => {
    const maxWidth = width - indent - 50;
    const words = text.split(' ');
    let line = '';

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const testWidth = fontRegular.widthOfTextAtSize(testLine, size);
      if (testWidth > maxWidth && n > 0) {
        if (y < 50) {
          page = addPage();
          y = height - 50;
        }
        page.drawText(line.trim(), {
          x: indent,
          y,
          size,
          font: fontRegular,
          color: rgb(0.15, 0.2, 0.25),
        });
        line = words[n] + ' ';
        y -= lineSpacing;
      } else {
        line = testLine;
      }
    }
    if (line.trim().length > 0) {
      if (y < 50) {
        page = addPage();
        y = height - 50;
      }
      page.drawText(line.trim(), {
        x: indent,
        y,
        size,
        font: fontRegular,
        color: rgb(0.15, 0.2, 0.25),
      });
      y -= lineSpacing;
    }
  };

  const drawBullet = (text, size = 8.5) => {
    if (y < 50) {
      page = addPage();
      y = height - 50;
    }
    page.drawText('•', {
      x: 55,
      y,
      size: 10,
      font: fontBold,
      color: rgb(0.01, 0.52, 0.78),
    });
    drawParagraph(text, size, 68, 12);
  };

  // Build Page 1 Content
  drawHeader();

  drawSectionTitle('Objective');
  drawParagraph(
    'Experienced Software Engineer specializing in Microservices architecture, Spring Boot, Apache Kafka, and Hibernate. Seeking a challenging role that allows me to leverage my expertise in building scalable and responsive software solutions using cutting-edge technologies.'
  );
  y -= 8;

  drawSectionTitle('Professional Summary');
  drawBullet('Java Developer with 4.9+ years of experience in Microservices architecture using technologies like Spring Boot, Apache Kafka, Hibernate, and Java 11.');
  drawBullet('Extensive experience in designing and developing scalable microservices architectures enabling robust enterprise application software programs.');
  drawBullet('Proficient in building event-driven systems and real-time data processing using Apache Kafka, ensuring efficient communication between microservices.');
  drawBullet('Strong expertise in database design, HQL, and Hibernate, ensuring efficient data storage, query optimization, and transactional retrieval.');
  drawBullet('Hands-on experience in developing applications using design patterns including Singleton, Factory, Builder, and DAO.');
  drawBullet('Proficient in frontend development using React.js, React Redux, Material UI, JavaScript, Bootstrap, Node.js, HTML5, and CSS3 to create responsive and user-friendly web interfaces.');
  drawBullet('Well versed with popular Java IDEs: IntelliJ IDEA, Eclipse, STS, and VS Code.');
  drawBullet('Skilled in Agile/Scrum methodologies, continuous integration, and DevOps practices using Git, GitHub, SVN, Maven, Docker, Kubernetes, Jenkins, and Jira.');
  y -= 8;

  drawSectionTitle('Technical Skills');
  drawParagraph('• Programming Languages: Java 11, Java 8, JavaScript, TypeScript, SQL, HTML5, CSS3', 8.5, 55, 12);
  drawParagraph('• Frameworks & Technologies: Spring Boot, Spring Framework, Apache Kafka, Hibernate ORM, REST APIs, HQL', 8.5, 55, 12);
  drawParagraph('• Frontend Technologies: React.js, React Redux, Material UI (MUI), Bootstrap, jQuery, Node.js', 8.5, 55, 12);
  drawParagraph('• Database Management: PostgreSQL, Oracle Database, MySQL, Redis Cache', 8.5, 55, 12);
  drawParagraph('• DevOps, Cloud & CI/CD: Docker, Kubernetes, Jenkins, Amazon AWS (S3, Cloud), Git, GitHub, SVN, Maven', 8.5, 55, 12);
  drawParagraph('• Quality & Observability: Mockito, JUnit, Confluent Kafka Control Center, Dynatrace APM, SonarLint, Jira', 8.5, 55, 12);
  y -= 8;

  drawSectionTitle('Work Experience');

  // Infosys
  page.drawText('Infosys  —  Technology Analyst', { x: 50, y, size: 10.5, font: fontBold, color: rgb(0.1, 0.15, 0.25) });
  page.drawText('August 2021 – Present  |  Bangalore, India', { x: width - 230, y, size: 8.5, font: fontOblique, color: rgb(0.3, 0.35, 0.45) });
  y -= 13;
  drawBullet('Design, develop, and maintain high-performance microservices-based applications following best practices for scalability, modularity, and fault tolerance.');
  drawBullet('Architect event-driven systems and real-time streaming pipelines using Apache Kafka and Confluent Control Center for inter-service communication.');
  drawBullet('Write unit tests, integration tests, and end-to-end tests with Mockito and JUnit, analyzing defects and bug fixing across DEV, SIT, and UAT.');
  drawBullet('Work closely with cross-functional teams, including product managers and architects, to gather requirements and deliver high-impact features.');
  y -= 6;

  // SOFFRONT
  page.drawText('SOFFRONT Software Pvt Ltd  —  Jr Java Developer / Full Stack Developer', { x: 50, y, size: 10.5, font: fontBold, color: rgb(0.1, 0.15, 0.25) });
  page.drawText('January 2019 – August 2021  |  Kolkata, India', { x: width - 230, y, size: 8.5, font: fontOblique, color: rgb(0.3, 0.35, 0.45) });
  y -= 13;
  drawBullet('Engineered cloud-based SaaS CRM platform features spanning marketing, sales, service, and operations hub modules.');
  drawBullet('Developed service, process, and integration layers on the backend in Java and Spring; migrated DAO logic from Spring JDBC to Hibernate.');
  drawBullet('Created interactive responsive UI using React.js, React Redux, and Material UI, integrating Amazon S3, Twilio SMS, and SendGrid email APIs.');
  y -= 10;

  drawSectionTitle('Projects Detail');

  // Project 1
  page.drawText('Project 1: Income Tax Return Processing Engine (CPC 2.0)', { x: 50, y, size: 10, font: fontBold, color: rgb(0.01, 0.52, 0.78) });
  page.drawText('Role: Back-end Developer  |  Team Size: 25  |  Duration: Aug 2021 – Present', { x: width - 260, y, size: 8, font: fontRegular, color: rgb(0.3, 0.35, 0.45) });
  y -= 12;
  drawParagraph('• Tech Stack: Java 11, Spring Boot, Apache Kafka, Hibernate, PostgreSQL, Oracle, Redis, Docker, Kubernetes, Jenkins, Mockito, Dynatrace', 8, 55, 11);
  drawParagraph('• Description: CPC 2.0 system implemented as a group of microservices processing millions of tax returns from E-filing portal to return processing (RP) lifecycle.', 8, 55, 11);
  drawBullet('Data-Inwarding Microservice: Loads returns filed by taxpayers from the e-filing portal and streams events.');
  drawBullet('Validation Microservice: Validates returns against complex statutory criteria and rules.');
  drawBullet('Tax Calculation & Interest: Executes business rules for income computation, deductions, tax liability, and statutory interest.');
  drawBullet('TDS/TCS Matching: Handles reconciliation of tax claimed vs deducted under TDS and TCS at scale.');
  y -= 6;

  // Project 2
  page.drawText('Project 2: SOFFRONT CRM (Customer Relationship Management)', { x: 50, y, size: 10, font: fontBold, color: rgb(0.01, 0.52, 0.78) });
  page.drawText('Role: Full Stack Developer  |  Team Size: 15  |  Duration: Jan 2019 – Aug 2021', { x: width - 260, y, size: 8, font: fontRegular, color: rgb(0.3, 0.35, 0.45) });
  y -= 12;
  drawParagraph('• Tech Stack: Spring, Hibernate, React.js, React Redux, Material UI, Java 8, JavaScript, MySQL, Amazon AWS S3, Twilio, SendGrid', 8, 55, 11);
  drawParagraph('• Description: Cloud-based multi-tenant SaaS CRM consolidating customer interactions, automated workflows, document management via Amazon S3, and appointment schedulers.', 8, 55, 11);
  drawBullet('Engineered lead capture web-forms, scheduler-driven popup reminders, and automated SMS/email pipelines.');
  drawBullet('Migrated DAO persistence layer from Spring JDBC to Hibernate, accelerating query response and code maintainability.');
  y -= 10;

  drawSectionTitle('Educational Detail');
  page.drawText('• B-Tech in Computer Science & Engineering (2012–2016) — Biju Patnaik University (BPUT), Odisha (7.1 CGPA)', { x: 55, y, size: 8.5, font: fontRegular, color: rgb(0.15, 0.2, 0.25) });
  y -= 13;
  page.drawText('• Intermediate / +2 Science (2010–2012) — CHSE, Orissa (68%)', { x: 55, y, size: 8.5, font: fontRegular, color: rgb(0.15, 0.2, 0.25) });
  y -= 13;
  page.drawText('• High School Certificate / HSC (2010) — Board of Secondary Education, Orissa (76%)', { x: 55, y, size: 8.5, font: fontRegular, color: rgb(0.15, 0.2, 0.25) });
  y -= 14;

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve('public', 'Rabinarayan_Asha_Resume.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('Successfully generated resume PDF at:', outputPath);
}

generatePDF().catch(console.error);
