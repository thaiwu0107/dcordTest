DECLARE @TDEAKey varchar(max);
SET @TDEAKey = @SQLKey;
DECLARE @word varchar(max);
SET @word = @passwords;
DECLARE @sqlPasswords varbinary(max);
set @sqlPasswords = EncryptByPassPhrase(@TDEAKey, @word)
SELECT CONVERT(varbinary(max), @sqlPasswords) as 'password'