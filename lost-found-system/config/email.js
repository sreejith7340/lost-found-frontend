const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

/**
 * Send email to claimant with reporter details
 * @param {Object} claimDetails - Details of the claim
 * @param {Object} reporterDetails - Details of the person who reported the item
 * @param {string} itemType - Type of item ('lost' or 'found')
 */
const sendClaimApprovalEmail = async (claimDetails, reporterDetails, itemType) => {
    try {
        const itemTypeLabel = itemType === 'lost' ? 'Lost Item' : 'Found Item';
        const reporterRole = itemType === 'lost' ? 'Original Reporter' : 'Finder';

        const htmlContent = `
        <h2>Item Claim Approved!</h2>
        <p>Dear ${claimDetails.claimant.name},</p>
        
        <p>Your claim for the <strong>${itemTypeLabel}</strong> has been <strong>APPROVED</strong> by our admin team.</p>
        
        <h3>Item Details:</h3>
        <ul>
            <li><strong>Item Name:</strong> ${claimDetails.itemName}</li>
            <li><strong>Item ID:</strong> ${claimDetails.itemId}</li>
            <li><strong>Status:</strong> Claimed</li>
        </ul>
        
        <h3>${reporterRole} Contact Information:</h3>
        <ul>
            <li><strong>Name:</strong> ${reporterDetails.name}</li>
            <li><strong>Email:</strong> ${reporterDetails.email}</li>
            ${reporterDetails.phone ? `<li><strong>Phone:</strong> ${reporterDetails.phone}</li>` : ''}
        </ul>
        
        <h3>Additional Item Information:</h3>
        <ul>
            <li><strong>Description:</strong> ${reporterDetails.description}</li>
            ${itemType === 'lost' 
                ? `<li><strong>Location Lost:</strong> ${reporterDetails.locationLost}</li>
                   <li><strong>Date Lost:</strong> ${new Date(reporterDetails.dateLost).toLocaleDateString()}</li>` 
                : `<li><strong>Location Found:</strong> ${reporterDetails.locationFound}</li>
                   <li><strong>Date Found:</strong> ${new Date(reporterDetails.dateFound).toLocaleDateString()}</li>`}
            <li><strong>Category:</strong> ${reporterDetails.category}</li>
            ${reporterDetails.adminNote ? `<li><strong>Admin Note:</strong> ${reporterDetails.adminNote}</li>` : ''}
        </ul>
        
        <p>Please contact the ${reporterRole.toLowerCase()} to arrange pickup/handover of the item.</p>
        
        <p>Best regards,<br>
        <strong>Lost & Found Management System</strong></p>
        `;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: claimDetails.claimant.email,
            subject: `Your Item Claim Has Been Approved - ${claimDetails.itemName}`,
            html: htmlContent,
            replyTo: reporterDetails.email
        };

        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('Email sending error:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Send email notification to reporter when a claim is approved
 * @param {Object} reporterDetails - Details of the person who reported the item
 * @param {Object} claimDetails - Details of the claim
 */
const sendClaimNotificationToReporter = async (reporterDetails, claimDetails) => {
    try {
        const htmlContent = `
        <h2>Your Item Claim Has Been Matched!</h2>
        <p>Dear ${reporterDetails.name},</p>
        
        <p>A claim has been approved for your ${claimDetails.itemType === 'lost' ? 'lost' : 'found'} item: <strong>${claimDetails.itemName}</strong></p>
        
        <h3>Claimant Contact Information:</h3>
        <ul>
            <li><strong>Name:</strong> ${claimDetails.claimant.name}</li>
            <li><strong>Email:</strong> ${claimDetails.claimant.email}</li>
            ${claimDetails.claimant.phone ? `<li><strong>Phone:</strong> ${claimDetails.claimant.phone}</li>` : ''}
        </ul>
        
        <p>Please coordinate with the claimant to arrange handover of the item.</p>
        
        <p>Best regards,<br>
        <strong>Lost & Found Management System</strong></p>
        `;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: reporterDetails.email,
            subject: `Claim Approved for Your ${claimDetails.itemType === 'lost' ? 'Lost' : 'Found'} Item - ${claimDetails.itemName}`,
            html: htmlContent,
            replyTo: claimDetails.claimant.email
        };

        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Notification email sent to reporter' };
    } catch (error) {
        console.error('Email sending error:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Send email notification to claimant when a claim is rejected
 * @param {Object} claimDetails - Details of the claim (claimant info, item name, etc.)
 * @param {string} adminNote - Admin note explaining the rejection reason
 * @param {string} itemType - Type of item ('lost' or 'found')
 */
const sendClaimRejectionEmail = async (claimDetails, adminNote, itemType) => {
    try {
        const itemTypeLabel = itemType === 'lost' ? 'Lost Item' : 'Found Item';

        const htmlContent = `
        <h2>Item Claim Rejection Notification</h2>
        <p>Dear ${claimDetails.claimant.name},</p>
        
        <p>We regret to inform you that your claim for the <strong>${itemTypeLabel}</strong> has been <strong>REJECTED</strong> by our admin team.</p>
        
        <h3>Item Details:</h3>
        <ul>
            <li><strong>Item Name:</strong> ${claimDetails.itemName}</li>
            <li><strong>Item ID:</strong> ${claimDetails.itemId}</li>
            <li><strong>Status:</strong> Rejected</li>
        </ul>
        
        ${adminNote ? `
        <h3>Reason for Rejection:</h3>
        <p>${adminNote}</p>
        ` : ''}
        
        <p>If you believe this decision was made in error, you can submit a new claim or contact our support team for further assistance.</p>
        
        <p>Best regards,<br>
        <strong>Lost & Found Management System</strong></p>
        `;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: claimDetails.claimant.email,
            subject: `Your Item Claim Has Been Rejected - ${claimDetails.itemName}`,
            html: htmlContent
        };

        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Rejection email sent successfully' };
    } catch (error) {
        console.error('Email sending error:', error);
        return { success: false, error: error.message };
    }
};

module.exports = {
    sendClaimApprovalEmail,
    sendClaimNotificationToReporter,
    sendClaimRejectionEmail
};
