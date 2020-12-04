program PassportCheck;

{$APPTYPE CONSOLE}

{$R *.res}

uses
  System.Classes,
  System.Generics.Collections,
  System.SysUtils;

function GetData(const aFileName: string): TList<TArray<string>>;

  function MemoryStreamToString(M: TMemoryStream): string;
  begin
    SetString(Result, PChar(M.Memory), M.Size div SizeOf(Char));
  end;

begin
  Result:= TList<TArray<string>>.Create;

  if (not FileExists(aFileName)) then begin
    Writeln('File not found: ' + aFileName);
    Exit;
  end;

  Writeln('Read file: ' + aFileName);

  var reader:= TStreamReader.Create(aFileName, TEncoding.UTF8);
  try
    var data:= reader.ReadToEnd.Split([#10, #13, #0]);

    Writeln(Format('Data has been read %d', [Length(data)]));

    var passport: TArray<string>:= nil;
    for var i:= 0 to Length(data) - 1 do begin
      var line:= data[i];

      if (line <> '') then begin
        var pairs: TArray<string>:= Trim(line).Split([' ']);
        if (passport <> nil) then
          passport:= passport + pairs
        else
          passport:= pairs;
      end
      else if (passport <> nil) then begin
        Result.Add(passport);
        passport:= nil;
      end;
    end;
  finally
    FreeAndNil(reader);
  end;
end;

function PassportIsValid(const aPassport: TArray<string>): Boolean;
const
  cFields: array [0 .. 7] of string = ('byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid');
  cOptField: string                 = 'cid';
begin
  Result:= False;

  var passportFields: TList<string>:= TList<string>.Create();
  try
    passportFields.AddRange(cFields);

    var passportData: string:= 'Check Passport:';

    for var i:= 0 to Length(aPassport) - 1 do begin
      passportData:= passportData + ' ' + aPassport[i];

      var key:= aPassport[i].Split([':'])[0];
      passportFields.Remove(key);
    end;

    Writeln(passportData);

    Result:= (passportFields.Count = 0) or ((passportFields.Count = 1) and (passportFields[0] = cOptField));
  finally
    FreeAndNil(passportFields);
  end;
end;

begin
  try
    var data: TList < TArray < string >> := GetData(ParamStr(ParamCount));
    try
      Writeln(Format('Found %d Passports to check', [data.Count]));

      var validPassports: Integer:= 0;

      for var passport: TArray<string> in data do begin
        if PassportIsValid(passport) then
          Inc(validPassports);
      end;

      Writeln(Format('There are %d valid Passports', [validPassports]));
    finally
      FreeAndNil(data);
    end;
  except
    on E: Exception do
      Writeln(E.ClassName, ': ', E.Message);
  end;
end.
