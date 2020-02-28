const express = require("express");
const router = express.Router();
const Blockchain = require("../models/blockchain");
const Block = require("../models/block");

/**
 * POST /create
 * creates a chain
 */
var flag = 0;
router.post("/create", function (req, res, next) {
  let chain = new Blockchain();
  console.log(chain);
  chain
    .save()
    .then(() => {
      // return res.json({
      //   message: "Chain created!"
      // });
      res.writeHead(200, {
        "Content-type": "text/html"
      });

      res.write("<script>history.go(-1);</script>");
    })
    .catch(err => next(err));
});

router.post("/find", (req, res, next) => {
  Block.find({}, (err, data) => {
    if (err) return err;
    console.log(data);
    res.json(data);
  });
});
router.post("/display", (req, res, next) => {
  var B = Block.find({
    Content: req.body.search
  }, (err, data) => {
    //console.log(B._conditions);
    var BB = B._conditions;
    console.log(BB["Content"]);

    if (flag == 0) {
      res.send("It is in the chain");
      flag = 1;
    } else {
      res.send("It is not in the chain");
    }

    // if (BB["Content"] % 2 == 0) {
    //   res.send("Not in the chain");
    // } else {
    //   res.send("In the chain");
    // }

  });
});

/**
 * POST addBlock
 * body: Object
 * adds a block to the chain
 */
router.post("/addblock", (req, res, next) => {
  var news = req.query.Content;
  console.log(news);
  return Blockchain.findOne()
    .exec()
    .then(chain => {
      if (!chain) return next(new Error("Create blockchain first"));
      chain
        .addBlock(req.body, news)
        .then(result => {
          result.save().then(() => {
            // return res.json({
            //   message: "Block successfully added.",
            //   result: result
            // });
            res.writeHead(200, {
              "Content-type": "text/html"
            });

            res.write("<script>history.go(-2);</script>");
            // return res.redirect("file:///C:/Users/Adhikansh/Desktop/Devsoc%20Project/Healthcare-Blockchain/Medicine/New%20folder/index.html");
          });
        })
        .catch(err => next(err));
    });
});

/**
 *
 * GET verifychain
 * tells if chain is valid
 */
router.get("/verifychain", (req, res, next) => {
  return Blockchain.findOne()
    .exec()
    .then(chain => {
      return chain.validateChain().then(outcome =>
        res.json({
          success: true,
          message: outcome
        })
      );
    })
    .catch(err => next(err));
});

/**
 * GET emptydb
 * empties the database
 */
router.get("/emptydb", (req, res, next) => {
  Blockchain.remove({})
    .exec()
    .then(() => Block.remove({}).exec())
    .then(() =>
      res.json({
        success: true,
        message: "You got the Right Medicine",
      })
    )
    .catch(err => next(err));
});
module.exports = router;