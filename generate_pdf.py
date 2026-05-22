from fpdf import FPDF

pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", size=12)
pdf.cell(200, 10, txt="John Doe", ln=1, align="C")
pdf.cell(200, 10, txt="Software Engineer", ln=2, align="C")
pdf.cell(200, 10, txt="Skills: Python, Java, SQL, React, Node, Docker, Machine Learning", ln=3)
pdf.cell(200, 10, txt="Experience: 5 years building scalable web applications.", ln=4)
pdf.output("sample_resume.pdf")
