const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodesense_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

 
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Brand = sequelize.define('brands', {
  name: {
    type: Sequelize.STRING
  },

  email: {
      type: Sequelize.STRING
  },

  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
}, {
  timestamps: false
});

 


const Product = sequelize.define('products', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },

  name: {
    type: Sequelize.STRING
  },

  weight: {
    type: Sequelize.STRING
  },

   year: {
    type: Sequelize.INTEGER 
  },

  price: {
    type: Sequelize.FLOAT 
  },

  released: {
      type: Sequelize.DATE
  },

  brandId: {
      type: Sequelize.INTEGER,

        references: {
            // This is a reference to another model
            model: Brand,

            // This is the column name of the referenced model
            key: 'id',
   }
  },

  featured: {
      type: Sequelize.BOOLEAN
  }
  
}, {
  timestamps: false
});

 

Brand.findAll().then(brands => {
  console.log(brands)

  brands.map(b => {
      console.log(b.id, b.name);
  })
})

//Create table
/*
// force: true will drop the table if it already exists

Brand.sync({force: true}).then(() => {
  
});
*/




const State = sequelize.define('states', {
  name: {
    type: Sequelize.STRING
  },

  code: {
      type: Sequelize.STRING
  },
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
}, {
  timestamps: false
});

 
const City = sequelize.define('cities', {
  name: {
    type: Sequelize.STRING
  },

  code: {
      type: Sequelize.STRING
  },
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },

  stateId: {
      type: Sequelize.INTEGER,

        references: {
            // This is a reference to another model
            model: State,

            // This is the column name of the referenced model
            key: 'id',
   }
  },

}, {
  timestamps: false
});

 
 

     
 

const Store = sequelize.define('stores', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },

  name: {
    type: Sequelize.STRING
  },

  email: {
    type: Sequelize.STRING
  },

  phone: {
    type: Sequelize.STRING
  },


  featured: {
      type: Sequelize.BOOLEAN
  },

  stateId: {
      type: Sequelize.INTEGER,

        references: {
            // This is a reference to another model
            model: State,

            // This is the column name of the referenced model
            key: 'id',
   }
  },


  cityId: {
      type: Sequelize.INTEGER,

        references: {
            // This is a reference to another model
            model: City,

            // This is the column name of the referenced model
            key: 'id',
   }
  },

}, {
  timestamps: false
});


const BrandStores = sequelize.define('brands_stores', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  
  brandId: {
      type: Sequelize.INTEGER,

        references: {
            // This is a reference to another model
            model: Brand,

            // This is the column name of the referenced model
            key: 'id',
   }
  },


  storeId: {
      type: Sequelize.INTEGER,

        references: {
            // This is a reference to another model
            model: Store,

            // This is the column name of the referenced model
            key: 'id',
   }
  },

}, {
  timestamps: false
});




Product.findAll().then(products => {
 
  products.map(p => {
      console.log(p.id, p.name);
  })
})

/*
Store.create({
    name: 'Store 1', 
    stateId: 20,
    cityId: 50,
    email: 'blr@example.com',
    phone: '9886991146',
    featured: true
})
*/

Store.findAll().then(products => {
 
  products.map(p => {
      console.log(p.id, p.name);
  })
})