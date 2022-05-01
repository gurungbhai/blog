var companyJSON={
  CompanyName:'Puryau',
  CompanyState:'Bagmati Pradesh',
  CompanyAddressLine1:'Sankhamul, Kathmandu',
  companyEmail:'hello@puryau.com',
  companyPhno:'01-5242321',
};

var fontSizes={
  HeadTitleFontSize:18,
  Head2TitleFontSize:16,
  TitleFontSize:14,
  SubTitleFontSize:12,
  NormalFontSize:10,
  SmallFontSize:8
};
 
var lineSpacing={
  NormalSpacing:12,
};

function generate_invoice(invoiceJSON,pickupDetails,customer_BillingInfoJSON) {
  
    var doc = new jsPDF('p', 'pt');
  
    var rightStartCol1=400;
    var rightStartCol2=480;


    var InitialstartX=40;
    var startX=40;
    var InitialstartY=50;
    var startY=0;

    var lineHeights=12;
    
    doc.setFontSize(fontSizes.Head2TitleFontSize);
    doc.setFont('times');
    doc.setFontType('bold');
    
    //pdf.addImage(agency_logo.src, 'PNG', logo_sizes.centered_x, _y, logo_sizes.w, logo_sizes.h);
    // doc.addImage(company_logo.src, 'PNG', startX,startY+=50, company_logo.w,company_logo.h);

    var img="data:image/png;base64,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";
    doc.addImage(img, 'PNG', startX,startY+=50, 120,80);

    doc.textAlign(companyJSON.CompanyName, {align: "left"}, startX, startY+=15+80);
    doc.setFontSize(fontSizes.NormalFontSize);
    
    doc.setFontType('bold');
    doc.textAlign("Address", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(companyJSON.CompanyAddressLine1, {align: "left"}, 80, startY);

    doc.setFontType('bold');
    doc.textAlign("EMAIL", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(companyJSON.companyEmail, {align: "left"}, 80, startY);

    doc.setFontType('bold');
    doc.textAlign("Phone: ", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(companyJSON.companyPhno, {align: "left"}, 80, startY);

   var tempY=InitialstartY;


    doc.setFontType('bold');
    doc.textAlign("INVOICE NO: ", {align: "left"},  rightStartCol1, tempY+=lineSpacing.NormalSpacing+80);
    doc.setFontType('normal');
    doc.textAlign(invoiceJSON.InvoiceNo, {align: "left"}, rightStartCol2, tempY);


    doc.setFontType('bold');
    doc.textAlign("INVOICE Date: ", {align: "left"},  rightStartCol1, tempY+=lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(invoiceJSON.InvoiceDate, {align: "left"}, rightStartCol2, tempY);
       
    doc.setFontType('normal');
   
    doc.setLineWidth(1);
   // doc.line(20, startY+lineSpacing.NormalSpacing, 580, startY+=lineSpacing.NormalSpacing);
    doc.line(20, startY+lineSpacing.NormalSpacing*1.6, 200, startY+lineSpacing.NormalSpacing*1.6);
    doc.line(400, startY+lineSpacing.NormalSpacing*1.6, 580, startY+lineSpacing.NormalSpacing*1.6);
   
    doc.setFontSize(fontSizes.Head2TitleFontSize);
    doc.setFontType('bold');
    doc.textAlign("DELIVERY INVOICE", {align: "center"}, startX, startY+=lineSpacing.NormalSpacing*2);
     
    doc.setFontSize(fontSizes.NormalFontSize);
    doc.setFontType('bold');

    //-------Customer Info Billing---------------------
   var startBilling=startY;

    doc.textAlign("Pickup Location,", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing*2);
    doc.textAlign(pickupDetails.CustomerName, {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
    doc.setFontSize(fontSizes.NormalFontSize);

    doc.setFontType('bold');
    doc.textAlign("Address", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(pickupDetails.CustomerAddressLine1, {align: "left"}, 80, startY);

    doc.setFontType('bold');
    doc.textAlign("Phone: ", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(pickupDetails.CustomerPhno, {align: "left"}, 80, startY);

    

    //-------Customer Info Shipping---------------------
    var rightcol1=340;
    var rightcol2=400;

    startY=startBilling;
    doc.setFontType('bold');
    doc.textAlign("Dropoff Location,", {align: "left"}, rightcol1, startY+=lineSpacing.NormalSpacing*2);
    doc.textAlign(customer_BillingInfoJSON.CustomerName, {align: "left"}, rightcol1, startY+=lineSpacing.NormalSpacing);
    doc.setFontSize(fontSizes.NormalFontSize);
    doc.setFontType('bold');

    doc.setFontType('bold');
    doc.textAlign("Address", {align: "left"}, rightcol1, startY+=lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(customer_BillingInfoJSON.CustomerAddressLine1, {align: "left"}, rightcol2, startY);

    doc.setFontType('bold');
    doc.textAlign("Phone: ", {align: "left"}, rightcol1, startY+=lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(customer_BillingInfoJSON.CustomerPhno, {align: "left"}, rightcol2, startY);
  

    doc.setFontType('bold');
    doc.textAlign("COD:", {align: "left"}, rightcol1, startY+=lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(customer_BillingInfoJSON.Cod, {align: "left"},rightcol2, startY);

    doc.setFontType('bold');
    doc.textAlign("Weight:", {align: "left"}, rightcol1, startY+=lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(customer_BillingInfoJSON.weight, {align: "left"},rightcol2, startY);

    doc.setFontType('bold');
    doc.textAlign("Distance", {align: "left"}, rightcol1, startY+=lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(customer_BillingInfoJSON.Distance, {align: "left"},rightcol2, startY);

    doc.setFontType('bold');
    doc.textAlign("Fare:", {align: "left"}, rightcol1, startY+=lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(customer_BillingInfoJSON.Fare, {align: "left"},rightcol2, startY);

    doc.setFontType('bold');
    doc.textAlign('Remarks:', {align: "left"}, rightcol1, startY+=lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(customer_BillingInfoJSON.Remarks, {align: "left"},rightcol2, startY);

    doc.setFontType('bold');
    doc.textAlign('Net Amount:', {align: "left"}, rightcol1, startY+=lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(customer_BillingInfoJSON.Amount, {align: "left"},rightcol2, startY);

    doc.save("invoice.pdf");
}


