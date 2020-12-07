using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace bags
{
    class Program
    {
        // line sample: 6-8 s: svsssszslpsp
        const string linePattern = @"(\w+ \w+) bags contain (.+)\.";
        const string valuePattern = @"(\d) (\w+ \w+)";
        const string searchBag = "shiny gold";
        static int count = 0;

        static void Main(string[] args)
        {
            var fileName = args?.ElementAtOrDefault(0) ?? "input.txt";
            if (!File.Exists(fileName))
            {
                Console.WriteLine($"File not found: {fileName}");
                Environment.Exit(1);
            }

            var data = File.ReadAllLines(fileName)
            .Select(line => Regex.Match(line, linePattern))
            .Where(m => m.Success)
            .ToDictionary(m => m.Groups[1].Value, m => m.Groups[2].Value);

            foreach (var kvp in data)
            {
                if (kvp.Key != searchBag)
                {
                    DoCount(data, kvp.Key, kvp.Value);
                }
            }

            Console.WriteLine($"{count} bag colors can eventually contain at least one shiny gold bag.");

            count = DoCount2(data, searchBag, data[searchBag]);

            Console.WriteLine($"{count} individual bags are required.");
        }

        static bool DoCount(IDictionary<string, string> data, string key, string value)
        {
            if (string.IsNullOrEmpty(key) || string.IsNullOrEmpty(value))
            {
                return false;
            }

            if (key == searchBag)
            {
                count++;
                return true;
            }

            foreach (var match in value.Split(',').Select(v => Regex.Match(v, valuePattern)).Where(m => m.Success))
            {
                var lookup = match.Groups[2].Value;
                if (DoCount(data, lookup, data[lookup]))
                {
                    return true;
                }
            }

            return false;
        }

        static int DoCount2(IDictionary<string, string> data, string key, string value)
        {
            var result = 0;

            if (string.IsNullOrEmpty(key) || string.IsNullOrEmpty(value))
            {
                return result;
            }

            foreach (var match in value.Split(',').Select(v => Regex.Match(v, valuePattern)).Where(m => m.Success))
            {
                var c = Convert.ToInt16(match.Groups[1].Value);
                var lookup = match.Groups[2].Value;

                result += c + c * DoCount2(data, lookup, data[lookup]);
            }

            return result;
        }
    }
}
