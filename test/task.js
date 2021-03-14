let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let server = require("../src/app");

// Assertion
chai.should()
chai.use(chaiHttp);
const path = '/api/v1/users';

describe('Insert a user: ',() => {
    let userInsert;

    after(function(done) {
        chai.request(server)
            .delete(path + `/${userInsert.id}`)
            .end( function(err, res) {
                expect(res).to.have.status(204);
                done();
            });
    });

    it('should be insert a user successfully', (done) => {
        chai.request(server)
            .post(path)
            .send({first_name: "Hugo", last_name: "Jurado", email: "hugojuradogarcia@gmail.com", birth_date: "1988-08-21"})
            .end( function(err, res) {
                userInsert = res.body[0];
                expect(res).to.have.status(201);
                done();
            });
    });

    it('should be an error when inserting an invalid first_name', (done) => {
        chai.request(server)
            .post(path)
            .send({first_name: "Hugo 12", last_name: "Jurado", email: "hugojuradogarcia@gmail.com", birth_date: "1988-08-21"})
            .end( function(err, res) {
                expect(res).to.have.status(400);
                done();
            });
    });

    it('should be an error when inserting an invalid last_name', (done) => {
        chai.request(server)
            .post(path)
            .send({first_name: "Hugo", last_name: "Jurado /", email: "hugojuradogarcia@gmail.com", birth_date: "1988-08-21"})
            .end( function(err, res) {
                expect(res).to.have.status(400);
                done();
            });
    });

    it('should be an error when inserting an invalid email', (done) => {
        chai.request(server)
            .post(path)
            .send({first_name: "Hugo", last_name: "Jurado", email: "hugojuradogarciagmail.com", birth_date: "1988-08-21"})
            .end( function(err, res) {
                expect(res).to.have.status(400);
                done();
            });
    });

    it('should be an error when inserting an invalid birth_date format', (done) => {
        chai.request(server)
            .post(path)
            .send({first_name: "Hugo", last_name: "Jurado", email: "hugojuradogarcia@gmail.com", birth_date: "1988/08/21"})
            .end( function(err, res) {
                expect(res).to.have.status(400);
                done();
            });
    });
});

describe('Get users: ',() => {
    let userAll;

    before(function(done) {
        chai.request(server)
            .post(path)
            .send({first_name: "Hugo", last_name: "Jurado", email: "hugojuradogarcia@gmail.com", birth_date: "1988-08-21"})
            .end( function(err, res) {
                userAll = res.body[0];
                done();
            });
    });

    after(function(done) {
        chai.request(server)
            .delete(path + `/${userAll.id}`)
            .end( function(err, res) {
                expect(res).to.have.status(204);
                done();
            });
    });

    describe('get all users: ',()=>{
        it('should be get all users successfully', (done) => {
            chai.request(server)
                .get(path)
                .end( function(err,res){
                    res.body.length.should.not.be.eq(0);
                    res.body.should.be.a('array');
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});

describe('Get user by id: ',() => {
    let userFindById;

    before(function(done) {
        chai.request(server)
            .post(path)
            .send({first_name: "Hugo", last_name: "Jurado", email: "hugojuradogarcia@gmail.com", birth_date: "1988-08-21"})
            .end( function(err, res) {
                userFindById = res.body[0];
                done();
            });
    });

    after(function(done) {
        chai.request(server)
            .delete(path + `/${userFindById.id}`)
            .end( function(err, res) {
                expect(res).to.have.status(204);
                done();
            });
    });

    it('should be get the user with id successfully', (done) => {
        chai.request(server)
            .get(path + `/${userFindById.id}`)
            .end( function(err,res){
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('first_name');
                res.body.should.have.property('last_name');
                res.body.should.have.property('email');
                res.body.should.have.property('birth_date');
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should be not found a user', (done) => {
        let id = 100001;
        chai.request(server)
            .get(path + `/${id}`)
            .end( function(err,res){
                res.body.should.have.property('status');
                res.body.should.have.property('message');
                expect(res.body).to.have.property('status').to.be.equal('Not Found');
                expect(res).to.have.status(404);
                done();
            });
    });

    it('should be bad request find a user', (done) => {
        let id = 'userId';
        chai.request(server)
            .get(path + `/${id}`)
            .end( function(err,res){
                res.body.should.have.property('message');
                res.body.should.have.property('field');
                expect(res.body).to.have.property('message').to.be.equal("'params.id' must be a number");
                expect(res).to.have.status(400);
                done();
            });
    });
});

describe('Update user by id: ',() => {
    let userUpdate;

    before(function(done) {
        chai.request(server)
            .post(path)
            .send({first_name: "Hugo", last_name: "Jurado", email: "hugojuradogarcia@gmail.com", birth_date: "1988-08-21"})
            .end( function(err, res) {
                userUpdate = res.body[0];
                done();
            });
    });

    after(function(done) {
        chai.request(server)
            .delete(path + `/${userUpdate.id}`)
            .end( function(err, res) {
                expect(res).to.have.status(204);
                done();
            });
    });

    it('should be update a user successfully', (done) => {
        chai.request(server)
            .put(path + `/${userUpdate.id}`)
            .send({first_name: "Diego", last_name: "Jurado", email: "diego@gmail.com", birth_date: "1988-08-21"})
            .end( function(err, res) {
                expect(res).to.have.status(204);
                done();
            });
    });

    it('should be bad request update a user', (done) => {
        let id = 'userId';
        chai.request(server)
            .put(path + `/${id}`)
            .send({first_name: "Diego", last_name: "Jurado", email: "diego@gmail.com", birth_date: "1988-08-21"})
            .end( function(err, res) {
                res.body.should.have.property('message');
                res.body.should.have.property('field');
                expect(res.body).to.have.property('message').to.be.equal("'params.id' must be a number");
                expect(res).to.have.status(400);
                done();
            });
    });

    it('should be an error when update an invalid first_name', (done) => {
        chai.request(server)
            .put(path + `/${userUpdate.id}`)
            .send({first_name: "Hugo 12", last_name: "Jurado", email: "hugojuradogarcia@gmail.com", birth_date: "1988-08-21"})
            .end( function(err, res) {
                expect(res).to.have.status(400);
                done();
            });
    });

    it('should be an error when update an invalid last_name', (done) => {
        chai.request(server)
            .put(path + `/${userUpdate.id}`)
            .send({first_name: "Hugo", last_name: "Jurado /", email: "hugojuradogarcia@gmail.com", birth_date: "1988-08-21"})
            .end( function(err, res) {
                expect(res).to.have.status(400);
                done();
            });
    });

    it('should be an error when update an invalid email', (done) => {
        chai.request(server)
            .put(path + `/${userUpdate.id}`)
            .send({first_name: "Hugo", last_name: "Jurado", email: "hugojuradogarciagmail.com", birth_date: "1988-08-21"})
            .end( function(err, res) {
                expect(res).to.have.status(400);
                done();
            });
    });

    it('should be an error when update an invalid birth_date format', (done) => {
        chai.request(server)
            .put(path + `/${userUpdate.id}`)
            .send({first_name: "Hugo", last_name: "Jurado", email: "hugojuradogarcia@gmail.com", birth_date: "1988/08/21"})
            .end( function(err, res) {
                expect(res).to.have.status(400);
                done();
            });
    });
});

describe('Delete user by id: ',() => {
    let user;

    before(function(done) {
        chai.request(server)
            .post(path)
            .send({first_name: "Hugo", last_name: "Jurado", email: "hugojuradogarcia@gmail.com", birth_date: "1988-08-21"})
            .end( function(err, res) {
                user = res.body[0];
                done();
            });
    });

    it('should be delete a user successfully', (done) => {
        chai.request(server)
            .delete(path + `/${user.id}`)
            .end( function(err, res) {
                expect(res).to.have.status(204);
                done();
            });
    });

    it('should be bad request update a user', (done) => {
        let id = 'userId';
        chai.request(server)
            .delete(path + `/${user.id}`)
            .end( function(err, res) {
                expect(res).to.have.status(204);
                done();
            });
    });
});