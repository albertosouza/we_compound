module.exports = 
  { "development":
	{ "driver":   "mongodb"
	  , "url":      "mongodb://localhost/we_compound"
	}
  , "test":
    { "driver":   "memory"
    }
  , "production":
    { "driver":   "memory"
    }
  };
