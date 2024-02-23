import puppeteer from "puppeteer";

async function generatePDF(formData) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
  await page.setContent(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap"
        rel="stylesheet"
      />
      <title>Invoice</title>
      <style>
      html {
        -webkit-print-color-adjust: exact;
      }
      body {
        margin: 0px;
        font-family: "Poppins", sans-serif;
      }

      .box {
        display: flex;
        flex-direction: column;
        max-width: 100vw;
        background-color: white;
      }

      .emailHeaderImg {
        width: 12rem;
        height: 8rem;
      }

      .Container {
        padding: 0rem 1rem;
      }
      .Header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .InvoiceHead {
        font-size: 2.25rem;
        line-height: 2.5rem;
        font-weight: 600;
        color: #000000;
        margin-right: 3.7rem;
      }

      .dataCards {
        display: flex;
        justify-content: space-between;
      }

      .subDataCard {
        padding: 0.5rem;
      }

      .subCardHead {
        font-size: 1.125rem;
        font-weight: 600;
      }

      .subCardText {
        font-size: 1rem;
        line-height: 0.9rem;
        display: flex;
        gap: 10px;
      }

      .Ref_Date {
        display: flex;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        margin-top: 0.6rem;
        justify-content: space-between;
        font-size: 1rem;
        line-height: 1.5rem;
      }

      .Table1 {
        overflow-x: auto;
          margin-top: 1.25rem;
          border-radius: 0.5rem;
          border-width: 1px;
    
      }

      .head1 {
        text-align: left;
        font-size: 1.2rem;
      }

      .head2 {
        text-align: right;
      }

      .table2Head {
        font-weight: bold;
      }
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
        border-bottom: 1px solid #D8D8D8;
      }

      td,
      th {
        text-align: left;
        padding: 1rem;
      }

      .tableData1 {
        margin: 0;
      }
      .tableData3 {
        color: #000000;
      }
      .head {
        background-color: #F7F7F7;
      }
      .AmountFooterContainer {
        padding: 2rem 2em 1rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: end;
        margin-left: 2%;
      }
      .subTotal {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1.5rem;
        width: 18rem;
      }
      .amount{
        display: flex !important;
        justify-content: space-between;
        margin-block: 1.8rem;
        padding-block: 1.3rem;
        padding-inline: 1rem;
        background-color: #F7F7F7;
        width: 100%;
      }
      .PaidAmountContainer{
        display: flex;
        justify-content: space-around;
      }
      .PaidAmountContainer strong{
        background-color: #F7F7F7;
        padding-inline: 1rem;
        padding-block: 1rem;
        border-radius: 10px;
      }
      .PaidAmountContainer span{
        padding-inline: 2.5rem;
        padding-block: 1rem;
        border: 1px solid black;
      }
      @media (max-width: 567px) {
        .Container {
          padding-inline: 20px;
        }
        .subCardText {
          font-size: 0.85rem;
        }
        .subCardHead {
          font-size: 0.85rem;
        }
        .invoiceOrderText {
          font-size: 0.85rem;
        }
        .head1 {
          font-size: 0.85rem;
        }
        .head2 {
          font-size: 0.85rem;
        }
        .tableData1 {
          font-size: 0.85rem;
        }
        .tableData3 {
          font-size: 0.85rem;
        }
      }
      @media (max-width: 398px) {
        .subCardText {
          font-size: 0.75rem;
        }
        .subCardHead {
          font-size: 0.75rem;
        }
        .invoiceOrderText {
          font-size: 0.75rem;
        }
        .head1 {
          font-size: 0.75rem;
        }
        .head2 {
          font-size: 0.75rem;
        }
        .tableData1 {
          font-size: 0.75rem;
        }
        .tableData3 {
          font-size: 0.75rem;
        }
      }
      </style>
    </head>
  
    <body>
      <div class="box">
        <div class="Container">
          <div class="Header">
            <img
              src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/ITEXPERTS_LOGO.png?v=1704170784"
              alt="keep"
              width="120"
            />
            <p class="InvoiceHead">Invoice</p>
          </div>
          <div class="dataCards">
            <div class="subDataCard">
              <p class="subCardText">Bill To:</p>
              <h1 class="subCardHead">${formData.to.name}</h1>
              <p class="subCardText">${formData.to.company}</p>

              <p class="subCardText">
                ${formData.to.phone}
              </p>
              <p class="subCardText">
                ${formData.to.email}
              </p>
            </div>
            <div class="subDataCard">
              <p class="subCardText">From:</p>
              <h1 class="subCardHead">IT Experts</h1>
              <p class="subCardText">042-36860072</p>
              <p class="subCardText">info@it-experts.compk</p>
              <p class="subCardText">
                1200 Brickell Avenue, </p>     
                <p class="subCardText">Suite 1950 Miami,</p> <p class="subCardText"> FLORIDA 33131
              </p>
            </div>
          </div>
          <div class="Ref_Date">
            <div>
              <p class="invoiceOrderText">
                <strong> Order Id:</strong>  ${formData.orderId}
              </p>
            </div>
            <p class="invoiceOrderText"><strong> Due Date:</strong>${new Date(formData.dueDate).toLocaleDateString()}</p>
          </div>
          <div class="Table1">
            <table>
              <tr class="head" >
                <th class="head1">Description</th>
                <th class="head2">Price</th>
              </tr>
              ${formData.service.map(service => `
                <tr>
                  <td>
                    <p class="tableData1">${service.serviceName}</p>
                  </td>
                  <td class="head2 tableData3">$${service.price}</td>
                </tr>
              `).join('')}
            </table>
          </div>
        </div>
        <div class="AmountFooterContainer">
        ${formData.invoiceType === 'half' ? `
          <div class="subTotal" ><span>Sub Total</span><span>$${formData.amount + formData.discount/2 }</span></div>
          <div class="subTotal"><span>Discount</span><span>$${formData.discount/2}</span></div>
          <div class="subTotal" style="background-color: #F7F7F7; padding-block: 1rem; padding-inline: 5px;">
          <strong>Total Amount</strong><strong>$${formData.amount}</strong>
        </div>
        </div>
          ` : `
          
          <div class="Container">
          <div style="display: flex; justify-content: space-between; margin-block: 1.8rem; padding-block: 1.3rem; padding-inline: 1rem; background-color: #F7F7F7; width: 43rem">
            <strong>Amount</strong>
            <strong>$${formData.amount + formData.discount}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-block: 1.8rem; padding-block: 1.3rem; padding-inline: 1rem; background-color: #F7F7F7;">
            <strong>Discount Amount</strong>
            <strong>$${formData.discount}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-block: 1.8rem; padding-block: 1.3rem; padding-inline: 1rem; background-color: #F7F7F7;">
            <strong>Final Amount</strong>
            <strong>$${formData.amount}</strong>
          </div>
        </div>
          `
      }

      



        
       
        ${formData.invoiceType === 'half' && formData.number === 1 ?  `
        <div class="Container PaidAmountContainer">
          <strong style={{backgroundcolor:"#F7F7F7"}}>Paid Amount:</strong>
          <span>$${formData.amount}</span>
          <strong>Remaining Amount:</strong>
          <span style={{backgroundcolor:"#F7F7F7"}}>$${formData.amount}</span>
        </div>
        ` : ''}
      </div>
    </body>
  </html>
  `);


  
  await page.waitForFunction('document.readyState === "complete"')
  
  const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    const headers = {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${formData.to.name}.pdf"`
    };

    return { pdfBuffer, headers };
  } catch (error) {
    throw new Error(error)
  }
}

export default generatePDF;
