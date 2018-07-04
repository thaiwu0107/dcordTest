DECLARE @word varbinary(max);
SET @word = @passwords;
DECLARE @TDEAKey varchar(max);
SET @TDEAKey = @SQLKey;
Select CONVERT(varchar(max), DECRYPTBYPASSPHRASE(@TDEAKey, @word)) as 'password'