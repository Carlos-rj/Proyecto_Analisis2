-- BASE DE DATOS
CREATE DATABASE Market;
USE Market;

-- TABLA DE RESIDENCIALES
CREATE TABLE Residencial (
idResidencial INT PRIMARY KEY AUTO_INCREMENT,
nombre_residencial VARCHAR(100) NOT NULL
);

-- UNA RESIDENCIAL TIENE UNA O MUCHAS COLONIAS
CREATE TABLE Colonia (
idColonia INT PRIMARY KEY AUTO_INCREMENT,
nombre_colonia VARCHAR(100) NOT NULL,
id_Residencial INT,
FOREIGN KEY (id_Residencial) REFERENCES Residencial(idResidencial)
);

-- PUEDEN HABER DOS TIPOS DE USUARIOS
CREATE TABLE Tipo_Usuario (
idTipoUsuario INT PRIMARY KEY AUTO_INCREMENT,
nombre_tipo_usuario VARCHAR(50) NOT NULL
);

INSERT INTO Tipo_Usuario (nombre_tipo_usuario) VALUES ("Vendedor");
INSERT INTO Tipo_Usuario (nombre_tipo_usuario) VALUES ("Comprador");

-- CATEGORIAS PARA FILTRAR TANTO USUARIOS COMO PRODUCTOS
CREATE TABLE Categoria (
idCategoria INT PRIMARY KEY AUTO_INCREMENT,
nombre_categoria VARCHAR(50) NOT NULL
);

-- INFORMACION BASICA DEL USUARIO
CREATE TABLE Usuario(
-- El id es generado por la APP
idUsuario INT PRIMARY KEY,
nombres VARCHAR(100),
apellidos VARCHAR(100),
fecha_nacimiento DATE,
correo_electronico VARCHAR(150),
contraseña VARCHAR(50),
descripcion VARCHAR(300),
tipo_usuario INT,
FOREIGN KEY (tipo_usuario) REFERENCES Tipo_Usuario(idTipoUsuario)
);

-- FILTRAR USUARIOS SEGUN SUS CATEGORIAS
CREATE TABLE Categoria_Usuario(
id_Usuario INT,
id_Categoria INT,
FOREIGN KEY (id_Usuario) REFERENCES Usuario(idUsuario),
FOREIGN KEY (id_Categoria) REFERENCES Categoria(idCategoria)
)
