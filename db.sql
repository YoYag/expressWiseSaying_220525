DROP DATABASE IF EXISTS a1;
CREATE DATABASE a1;
USE a1;

DROP TABLE IF EXISTS wise_saying;

CREATE TABLE wise_saying(
	id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	reg_date DATETIME NOT NULL ,
	content VARCHAR(300) NOT NULL,
	figure VARCHAR(50) NOT NULL
);

DESC wise_saying;

INSERT INTO wise_saying
SET reg_date = NOW(),
content = "삶이 있는 한 희망은 있다.",
figure = "키케로";

INSERT INTO wise_saying
SET reg_date = NOW(),
content = "산다는것 그것은 치열한 전투이다.",
figure = "로망로랑";

INSERT INTO wise_saying
SET reg_date = NOW(),
content = "언제나 현재에 집중할수 있다면 행복할것이다.",
figure = "파울로 코엘료";

INSERT INTO wise_saying
SET reg_date = NOW(),
content = "진정으로 웃으려면 고통을 참아야하며 , 나아가 고통을 즐길 줄 알아야 해",
figure = "찰리 채플린";

INSERT INTO wise_saying
SET reg_date = NOW(),
content = "피할수 없으면 즐겨라",
figure = "로버트 엘리엇";

SELECT * FROM wise_saying;

SELECT * FROM wise_saying
ORDER BY RAND() LIMIT 1;

ALTER TABLE wise_saying
ADD COLUMN hits INT UNSIGNED NOT NULL;

DESC wise_saying;

UPDATE wise_saying
SET hits = hits + 1
WHERE id = 1;

SELECT * FROM wise_saying;