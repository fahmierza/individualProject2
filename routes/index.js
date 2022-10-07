var express = require('express');
var router = express.Router();

const db = require('../models');
const News = db.newss2;
const Comment = db.comments2;
const Op = db.Sequelize.Op;


/* GET home page. */

router.get('/all', function(req, res, next) {
	News.findAll()
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.json({
			info: "Error",
			message: err.message
		});
	});
});

//detail news
router.get('/newsdetail/:id', async function (req, res, next) {
	const id = req.params.id;
	const commentss = await Comment.findAll({ where: { idnews: id } });
	await News.findByPk(id)
		.then(detailNews => {
			if (detailNews) {
				res.send({
					newss: detailNews,
					comments: commentss
				});
			} else {
				res.status(404).send({
					message: "Tidak ada data id=" + id
				})
			}
			
		})
		.catch(err => {
			res.json({
				info: "Error",
				message: err.message
			});
		});

});

//add news
router.get('/addnews', function (req, res, next) {
	res.render('addnews', { title: 'Tambah Berita' });
});
router.post('/addnews', function (req, res, next) {
	var news = {
		judul: req.body.judul,
		author: req.body.author,
		artikel: req.body.artikel,
	}
	News.create(news)
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.json({
			info: "Error",
			message: err.message
		});
	});
});

router.get('/deletenews/:id', function (req, res, next) {
	const id = req.params.id;

	News.destroy({
		where: {id: id}
	})
	.then(num => {
		if(num>0){
			res.send({message:"data telah dihapus"});
		}else{
			// http 404 not found
			res.status(404).send({
				message: "Tidak ada data id=" + id
			})
		}
		
	})
	.catch(err => {
		res.json({
			info: "Error",
			message: err.message
		});
	});
});


router.put('/editnews/:id', function (req, res, next) {
	const id = req.params.id;
	var news = {
		judul: req.body.judul,
		author: req.body.author,
		artikel: req.body.artikel,
	}
	News.update(news, {
		where: {id: id}
	})
	.then(num => {
		if(num>0){
			res.send({message:"data diperbarui"});
		}else{
			// http 404 not found
			res.status(404).send({
				message: "Tidak ada data id=" + id
			})
		}
		
	})
	.catch(err => {
		res.json({
			info: "Error",
			message: err.message
		});
	});

});

//comment
router.post('/comment', function (req, res, next) {
	let comment = {
		idnews: req.body.idnews,
		nama: req.body.nama,
		komentar: req.body.komentar
	}
	Comment.create(comment)
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.json({
			info: "Error",
			message: err.message
		});
	});
});



module.exports = router;
