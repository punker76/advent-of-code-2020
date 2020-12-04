program PassportCheck;

{$APPTYPE CONSOLE}

{$R *.res}

uses
  System.Classes,
  System.Generics.Collections,
  System.RegularExpressions,
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

function PassportIsFullValid(const aPassport: TArray<string>): Boolean;
const
  cFields: array [0 .. 7] of string = ('byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid');
  cOptField: string                 = 'cid';
begin
  Result:= False;

  var passportFields: TList<string>:= TList<string>.Create();
  try
    passportFields.AddRange(cFields);

    var passportData: string:= 'Check Passport:';
    var allFieldsValid: Boolean:= True;

    for var i:= 0 to Length(aPassport) - 1 do begin
      passportData:= passportData + ' ' + aPassport[i];

      var pair:= aPassport[i].Split([':']);
      var key:= pair[0];
      var value:= pair[1];

      passportFields.Remove(key);

      if (key = 'byr') then begin
        var iBirthYear:= StrToIntDef(value, -1);
        allFieldsValid:= allFieldsValid and (iBirthYear >= 1920) and (iBirthYear <= 2002);
      end
      else if (key = 'iyr') then begin
        var iIssueYear:= StrToIntDef(value, -1);
        allFieldsValid:= allFieldsValid and (iIssueYear >= 2010) and (iIssueYear <= 2020);
      end
      else if (key = 'eyr') then begin
        var iExpirationYear:= StrToIntDef(value, -1);
        allFieldsValid:= allFieldsValid and (iExpirationYear >= 2020) and (iExpirationYear <= 2030);
      end
      else if (key = 'hgt') then begin
        allFieldsValid:= False;
        if (value.Contains('cm')) then begin
          var iHeight:= StrToIntDef(Trim(value.Replace('cm', '', [rfReplaceAll, rfIgnoreCase])), -1);
          allFieldsValid:= (iHeight >= 150) and (iHeight <= 193);
        end
        else if (value.Contains('in')) then begin
          var iHeight:= StrToIntDef(Trim(value.Replace('in', '', [rfReplaceAll, rfIgnoreCase])), -1);
          allFieldsValid:= (iHeight >= 59) and (iHeight <= 76);
        end;
      end
      else if (key = 'hcl') then begin
        allFieldsValid:= allFieldsValid and TRegEx.IsMatch(value, '^(#[0-9|a-f]{6}){1}$');
      end
      else if (key = 'ecl') then begin
        allFieldsValid:= allFieldsValid and TRegEx.IsMatch(value, '^(amb|blu|brn|gry|grn|hzl|oth){1}$');
      end
      else if (key = 'pid') then begin
        allFieldsValid:= allFieldsValid and TRegEx.IsMatch(value, '^[0-9]{9}$');
      end
      else if (key = 'cid') then begin
        allFieldsValid:= allFieldsValid and True;
      end;

      if not allFieldsValid then Break;
    end;

    Writeln(passportData);

    Result:= allFieldsValid and ((passportFields.Count = 0) or ((passportFields.Count = 1) and (passportFields[0] = cOptField)));
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
      var fullValidPassports: Integer:= 0;

      for var passport: TArray<string> in data do begin
        if PassportIsValid(passport) then
          Inc(validPassports);
        if PassportIsFullValid(passport) then
          Inc(fullValidPassports);
      end;

      Writeln(Format('There are %d valid Passports', [validPassports]));
      Writeln(Format('There are %d full valid Passports', [fullValidPassports]));
    finally
      FreeAndNil(data);
    end;
  except
    on E: Exception do
      Writeln(E.ClassName, ': ', E.Message);
  end;
end.
