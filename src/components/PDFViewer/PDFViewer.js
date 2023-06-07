import React from 'react';

const PDFViewer = ({ pdfUrl }) => {
  const containerStyle = {
    width: '100%',
    height: '800px',
  };

  return (
    <div style={containerStyle}>
      <object data={process.env.PUBLIC_URL + pdfUrl} type="application/pdf" width="100%" height="100%">
        Seu navegador não suporta a visualização de PDF. Você pode fazer o download do arquivo <a href={process.env.PUBLIC_URL + pdfUrl}>aqui</a>.
      </object>
    </div>
  );
};

export default PDFViewer;
