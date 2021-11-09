create database SampleDB
go

use SampleDB
go

if OBJECT_ID(N'dbo.SampleApiTasks', N'U') IS NOT NULL 
drop table SampleApiTasks 

go

create table SampleApiTasks(
id int identity(1,1),
[name] varchar(50),
author varchar (100)
);

go

INSERT INTO [dbo].[SampleApiTasks] ([name],[author]) VALUES ('task1', 'author1')
INSERT INTO [dbo].[SampleApiTasks] ([name],[author]) VALUES ('task2', 'author2')
INSERT INTO [dbo].[SampleApiTasks] ([name],[author]) VALUES ('task3', 'author3')
INSERT INTO [dbo].[SampleApiTasks] ([name],[author]) VALUES ('task4', 'author4')
INSERT INTO [dbo].[SampleApiTasks] ([name],[author]) VALUES ('task5', 'author5')
INSERT INTO [dbo].[SampleApiTasks] ([name],[author]) VALUES ('task6', 'author6')
INSERT INTO [dbo].[SampleApiTasks] ([name],[author]) VALUES ('task7', 'author7')

go

select * from SampleApiTasks