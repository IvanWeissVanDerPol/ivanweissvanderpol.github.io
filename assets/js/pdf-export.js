document.addEventListener('DOMContentLoaded', function() {
  // Initialize PDF download buttons
  const pdfButtons = document.querySelectorAll('.btn-download-pdf, #download-pdf');
  if (pdfButtons.length === 0) return;
  
  pdfButtons.forEach(button => {
    button.addEventListener('click', generatePdf);
  });

  // Generate PDF from current page
  async function generatePdf(e) {
    e.preventDefault();
    const button = e.target.closest('a, button');
    
    try {
      // Show loading state
      const originalText = button.innerHTML;
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
      button.classList.add('disabled');

      // Load html2pdf dynamically
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');
      
      // Get the main content elements
      const sidebar = document.querySelector('.sidebar-wrapper');
      const mainContent = document.querySelector('.main-wrapper');
      
      if (!sidebar || !mainContent) {
        throw new Error('Page content not found');
      }
      
      // Create clean copies of the content
      const cleanSidebar = document.createElement('div');
      cleanSidebar.innerHTML = sidebar.innerHTML;
      
      const cleanMain = document.createElement('div');
      cleanMain.innerHTML = mainContent.innerHTML;
      
      // Remove interactive elements
      const removeElements = (el, selectors) => {
        selectors.forEach(selector => {
          const elements = el.querySelectorAll(selector);
          elements.forEach(el => el.remove());
        });
      };
      
      removeElements(cleanSidebar, ['button', '.btn', '[onclick]', 'script', 'style']);
      removeElements(cleanMain, ['button', '.btn', '[onclick]', 'script', 'style']);
      
      // Create a new window for the PDF
      const printWindow = window.open('', '_blank');
      
      // Create the PDF HTML with proper styling
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Ivan Weiss Van Der Pol - Resume</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
            
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            
            body {
              font-family: 'Roboto', sans-serif;
              line-height: 1.6;
              color: #333;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              background: #fff;
              margin: 0;
              padding: 0;
            }
            
            .pdf-container {
              display: flex;
              width: 100%;
              min-height: 100vh;
            }
            
            .pdf-sidebar {
              width: 35%;
              background: #2d2d2d;
              color: #fff;
              padding: 30px 15px;
            }
            
            .pdf-main {
              width: 65%;
              padding: 30px;
              background: #fff;
            }
            
            @media print {
              @page {
                margin: 0;
                size: A4;
              }
              
              body {
                margin: 0;
                padding: 0;
              }
              
              .pdf-sidebar {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 35% !important;
                margin: 0 !important;
                padding: 25px 15px !important;
              }
              
              .pdf-main {
                width: 65% !important;
                margin-left: 35% !important;
                padding: 25px 30px !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="pdf-container">
            <div class="pdf-sidebar">
              ${cleanSidebar.innerHTML}
            </div>
            <div class="pdf-main">
              ${cleanMain.innerHTML}
            </div>
          </div>
        </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Wait for the content to load
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Configure PDF options
      const pdfOptions = {
        margin: 0,
        filename: `Ivan_Weiss_Van_Der_Pol_Resume_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false,
          scrollX: 0,
          scrollY: 0,
          backgroundColor: '#ffffff',
          letterRendering: true
        },
        jsPDF: { 
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        }
      };
      
      // Generate the PDF
      await window.html2pdf()
        .set(pdfOptions)
        .from(printWindow.document.body)
        .save();
      
      // Close the print window
      printWindow.close();
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again or use the print function (Ctrl+P).');
    } finally {
      // Restore button state
      if (button) {
        button.innerHTML = originalText;
        button.classList.remove('disabled');
      }
    }
  }
  
  // Helper function to load scripts dynamically
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
});
