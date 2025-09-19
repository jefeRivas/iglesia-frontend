import html2canvas from 'html2canvas';

export const downloadScheduleAsImage = async (elementId, filename) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Elemento no encontrado');
      return;
    }

    // Crear un contenedor temporal
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    container.style.padding = '20px';
    container.style.backgroundColor = 'white';
    document.body.appendChild(container);

    // Clonar la tabla
    const clone = element.cloneNode(true);
    container.appendChild(clone);

    // Aplicar estilos al clon
    const headerCells = clone.getElementsByTagName('th');
    const dataCells = clone.getElementsByTagName('td');

    Array.from(headerCells).forEach(cell => {
      cell.style.backgroundColor = '#2563eb';
      cell.style.color = 'white';
      cell.style.padding = '12px';
      cell.style.border = '2px solid #1e3a8a';
    });

    Array.from(dataCells).forEach(cell => {
      if (cell.parentElement?.firstElementChild === cell) {
        cell.style.backgroundColor = '#f3f4f6';
      } else {
        cell.style.backgroundColor = 'white';
      }
      cell.style.color = 'black';
      cell.style.padding = '12px';
      cell.style.border = '2px solid #e5e7eb';
      
      // Manejar diferentes tipos de celdas
      const select = cell.querySelector('select');
      if (select) {
        // Es programación manual
        if (select.value && select.value !== "") {
          cell.textContent = select.options[select.selectedIndex].text;
        } else {
          cell.textContent = "SIN ASIGNAR";
        }
      } else {
        // Es programación automática - mantener el contenido original
        cell.textContent = cell.textContent || "SIN ASIGNAR";
      }
    });

    // Capturar la imagen
    const canvas = await html2canvas(clone, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
    });

    // Limpiar
    document.body.removeChild(container);

    // Descargar la imagen
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  } catch (error) {
    console.error('Error al descargar la imagen:', error);
  }
};