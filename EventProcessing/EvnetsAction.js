const EventEmitter = require('events');
const sendMail = require('./EmailTemplate');
const eventEmitter = new EventEmitter();

//To send a mail to Buyer when there the goods status is processedn or delivered
eventEmitter.on('tradeUpdated', async (Transaction , ToEmailId) => {
    try {
      
        sendMail({
            subject: `Critical Event Detected`,
            message: `Shipment ${Transaction._id} is in ${Transaction.status}`,
            email: ToEmailId
        });
    } catch (err) {
        console.error('Error updating inventory:', err);
    }

});

// To send a mail to Buyer when there is a critical Event Of Delay in a Order
eventEmitter.on('CriticalEvent/Delayed', async (Transaction , ToEmailId) => {

   try {
        const message = `Extremely sorry for the Delay in your order ${Transaction._id} `
        sendMail({subject:`Critical Event Detected`, message , ToEmailId});  
   } catch (error) {
        console.log("There is a issue in sending mail for Delay - critical Event")
   }

});

// To send a mail to Buyer when there is a critical Event Of Cancelalation of a Order
eventEmitter.on('CriticalEvent/Cancelled', async (Transaction , ToEmailId) => {

    try {
         const message = `Extremely sorry for ${Transaction.OrderStatus} of your order ${Transaction._id} `
         sendMail({subject:`Critical Event Detected`, message , ToEmailId});  
    } catch (error) {
         console.log("There is a issue in sending mail for Cancellation - critical Event")
    }
 
 });

module.exports = eventEmitter