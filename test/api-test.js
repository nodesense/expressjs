//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
require('../models/product');

let Product = mongoose.model("Product");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Product', () => {
    beforeEach((done) => { //Before each test we empty the database
        Product.remove({}, (err) => { 
           done();         
        });     
    });
/*
  * Test the /GET route
  */
  describe('/GET api/products', () => {
      it('it should GET all the products', (done) => {
        chai.request(server)
            .get('/api/products')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });



  describe('/POST api/products', () => {
      it('it should POST a product', (done) => {
        let product = {
            name: "iphone",
            year: 2010
        }
        chai.request(server)
            .post('/api/products')
            .send(product)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                
                res.body.should.have.property('name');
              res.body.should.have.property('_id');
                 res.body.should.have.property('name').eql('iphone');

                res.body.should.have.property('year').eql(2010);
                
              done();
            });
      });

  });
 


});