using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace PasswordPhilosophy
{
    class Program
    {
        static void Main(string[] args)
        {
            var data = File.ReadAllLines(args?.Length > 0 ? args[0] : "input.txt");
            Console.WriteLine($"Data has been read => {data.Count()} passwords");

            // line sample: 6-8 s: svsssszslpsp
            const string linePattern = @"^(\d+)-(\d+) (.{1}): (.+)$";

            var validPasswords = 0;

            foreach (var line in data)
            {
                var lineMatch = Regex.Match(line, linePattern);
                if (lineMatch.Success)
                {
                    var min = Convert.ToInt16(lineMatch.Groups[1].Value);
                    var max = Convert.ToInt16(lineMatch.Groups[2].Value);
                    var searchChar = Convert.ToChar(lineMatch.Groups[3].Value);
                    var password = lineMatch.Groups[4].Value;
                    var searchCharCount = password.ToCharArray().Count(c => c == searchChar);
                    if (searchCharCount >= min && searchCharCount <= max)
                    {
                        validPasswords++;
                        Console.WriteLine($"PW valid: min={min}, max={max}, char={searchChar}, password={password}");
                    }
                }
            }

            Console.WriteLine($"There are {validPasswords} valid passwords according to their policies.");
        }
    }
}
