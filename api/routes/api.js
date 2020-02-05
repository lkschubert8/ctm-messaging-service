var express = require("express");
var router = express.Router();
const db = require("../services/db");
const messagingService = require("../services/messaging");

router.get("/communications", async function(req, res, next) {
  let communications = await db.getCommuncations();
  return res.status(200).send(communications);
});

router.post("/communications", async function(req, res, next) {
  try {
    let { message, phoneNumber, name } = req.body;
    if (!message || !phoneNumber || !name) return res.sendStatus(400);
    let sendResult = await messagingService.sendMessage(phoneNumber, message);
    let communicationId = await db.createCommunication(name, sendResult.to); //Use the external service's
    //cannonicalized phoneNumber
    await db.addMessage(communicationId, message, false);
    console.log(communicationId);
    return res.status(200).send();
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.get("/communications/:communicationId/messages", async function(
  req,
  res,
  next
) {
  try {
    let messages = await db.getCommunicationMessages(
      req.params.communicationId
    );
    return res.status(200).send(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
});

router.post("/communications/:communicationId/messages", async function(
  req,
  res,
  next
) {
  try {
    let message = req.body.message;
    console.log(req.body);
    if (!message) {
      return res.status(400).send();
    }
    let { communicationId } = req.params;
    let phoneNumber = (await db.getNumberByCommunicationId(communicationId))
      .phoneNumber;
    await messagingService.sendMessage(phoneNumber, message);
    await db.addMessage(communicationId, message, false);
    return res.status(200).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
});

router.post("/communications/receive", async function(req, res, next) {
  try {
    let communicationId = (
      await db.getCommunicationIdByPhoneNumber(req.body.From)
    ).communicationId;
    if (!communicationId) {
      console.log(
        `INFO - Received message from unknown number ${req.body.From}`
      );
    } else {
      console.log(req.body.Body);
      await db.addMessage(communicationId, req.body.Body, 1);
    }
    return res.status(200).send();
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
