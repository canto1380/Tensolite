create database if not exists blog_peliculas;
use blog_peliculas;

create table if not exists usuario (
	id int(12) auto_increment,
	email varchar(50) unique not null,
	nombre varchar(50) not null,
	apellido varchar(50) not null,
	clave varchar(40) not null,
	deleted boolean DEFAULT false,
	PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists categoria (
	id int(12) auto_increment,
	nombre_categoria varchar(50) unique not null,
	deleted boolean DEFAULT false,
	PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists pelicula (
	id int(12) auto_increment,
	nombre_pelicula varchar(50) not null,
	descip_pelicula varchar(200) not null,
	anio_estreno smallint not null,
	id_categoria int(12) not null,
	deleted boolean DEFAULT false,
	PRIMARY KEY(id),
	foreign key(id_categoria) references categoria(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists comentario (
	id int(12) auto_increment,
	comentario varchar(250) not null,
	fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	id_pelicula int(12) not null,
	deleted boolean DEFAULT false,
	PRIMARY key(id),
	foreign key(id_pelicula) references pelicula(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into usuario('email','nombre','apellido','clave') values
	('prueba1@gmail.com', 'nombre1','apellido1','123456'),
	('prueba2@gmail.com', 'nombre2','apellido2','456789'),
	('prueba3@gmail.com', 'nombre3','apellido3','123789'),
	('prueba4@gmail.com', 'nombre4','apellido4','456123');

insert into categoria(`nombre_categoria`) values
	('Accion'),
	('Comedia'),
	('Ciencia Ficcion'),
	('Infantiles'),
	('Terror'),
	('Basada en hechos reales'),
	('Triller'),
	('Suspenso'),
	('Romantica'),
	('Comedia Romantica');


insert into pelicula(`nombre_pelicula`,`descip_pelicula`,`anio_estreno`, `id_categoria`) values
	('Accion 1','Esta es una descripcion de prueba para la pelicula Accion 1',2015,1),
	('Accion 2','Esta es una descripcion de prueba para la pelicula Accion 2',2005,1),
	('Accion 3','Esta es una descripcion de prueba para la pelicula Accion 3',2012,1),
	('Accion 4','Esta es una descripcion de prueba para la pelicula Accion 4',2018,1),
	('Comedia 1','Esta es una descripcion de prueba para la pelicula Comedia 1',2022,2),
	('Comedia 2','Esta es una descripcion de prueba para la pelicula Comedia 2',2015,2),
	('Comedia 3','Esta es una descripcion de prueba para la pelicula Comedia 3',2000,2),
	('Ciencia Ficcion 1','Esta es una descripcion de prueba para la pelicula Ciencia Ficcion 1',2019,3),
	('Ciencia Ficcion 2','Esta es una descripcion de prueba para la pelicula Ciencia Ficcion 2',2006,3),
	('Infantles 1','Esta es una descripcion de prueba para la pelicula Infantles 1',2015,4),
	('Infantles 2','Esta es una descripcion de prueba para la pelicula Infantles 2',2016,4),
	('Infantles 3','Esta es una descripcion de prueba para la pelicula Infantles 3',2017,4),
	('Terror 1','Esta es una descripcion de prueba para la pelicula Terror 1',2005,5),
	('Terror 2','Esta es una descripcion de prueba para la pelicula Terror 2',2015,5),
	('Basada en hechos reales 1','Esta es una descripcion de prueba para la pelicula Basada en hechos reales 1',2006,6),
	('Basada en hechos reales 2','Esta es una descripcion de prueba para la pelicula Basada en hechos reales 2',2016,6),
	('Basada en hechos reales 3','Esta es una descripcion de prueba para la pelicula Basada en hechos reales 3',2022,6),
	('Triller 1','Esta es una descripcion de prueba para la pelicula Triller 1',2015,7),
	('Triller 2','Esta es una descripcion de prueba para la pelicula Triller 2',2019,7),
	('Triller 3','Esta es una descripcion de prueba para la pelicula Triller 3',2005,7),
	('Triller 4','Esta es una descripcion de prueba para la pelicula Triller 4',2008,7),
	('Suspenso 1','Esta es una descripcion de prueba para la pelicula Suspenso 1',2014,8),
	('Suspenso 2','Esta es una descripcion de prueba para la pelicula Suspenso 2',2016,8),
	('Romantica 1','Esta es una descripcion de prueba para la pelicula Romantica 1',2009,9),
	('Romantica 2','Esta es una descripcion de prueba para la pelicula Romantica 2',2019,9),
	('Comedia Romantica 1','Esta es una descripcion de prueba para la pelicula Comedia Romantica 1',2009,10);


insert into  comentario(`comentario`, `id_pelicula`) values
  ('Comentario de prueba 1', 1),
  ('Comentario de prueba 2', 1),
  ('Comentario de prueba 3', 2),
  ('Comentario de prueba 4', 3),
  ('Comentario de prueba 5', 4),
  ('Comentario de prueba 6', 4),
  ('Comentario de prueba 7', 4),
  ('Comentario de prueba 8', 5),
  ('Comentario de prueba 9', 5),
  ('Comentario de prueba 10', 5),
  ('Comentario de prueba 11', 5),
  ('Comentario de prueba 12', 7),
  ('Comentario de prueba 13', 8),
  ('Comentario de prueba 14', 8),
  ('Comentario de prueba 15', 10),
  ('Comentario de prueba 16', 10),
  ('Comentario de prueba 17', 12),
  ('Comentario de prueba 18', 13),
  ('Comentario de prueba 19', 15),
  ('Comentario de prueba 20', 15),
  ('Comentario de prueba 21', 15),
  ('Comentario de prueba 22', 16),
  ('Comentario de prueba 23', 17),
  ('Comentario de prueba 24', 17),
  ('Comentario de prueba 25', 17),
  ('Comentario de prueba 26', 19),
  ('Comentario de prueba 27', 20),
  ('Comentario de prueba 28', 22),
  ('Comentario de prueba 29', 22),
  ('Comentario de prueba 30', 24);
