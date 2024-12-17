const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});

router.use(limiter);

const Joi = require('joi');

const schema = Joi.object({
  page: Joi.number().min(1),
  limit: Joi.number().min(1).max(100),
  startDate: Joi.date(),
  endDate: Joi.date().min(Joi.ref('startDate'))
});

const cache = require('../utils/cache'); 

router.get("/calendar", cache.middleware(300), async (req, res) => {
});

const logger = require('../utils/logger');

logger.info('Fetching calendar events', { 
  userId: req.user.id,
  query: req.query 
});