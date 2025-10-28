use login_db;

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Register](
	[Uid] [uniqueidentifier] NOT NULL,
	[FirstName] [varchar](150) NOT NULL,
	[LastName] [varchar](150) NOT NULL,
	[Email] [varchar](300) NOT NULL,
	[Password] [varchar](150) NOT NULL,
	CONSTRAINT [PK_Register] PRIMARY KEY CLUSTERED 
(
	[Uid] ASC
) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Register] ADD  CONSTRAINT [DF_Register_Uid]  DEFAULT (newid()) FOR [Uid]
GO