require 'rubygems'
require 'nokogiri'
require 'open-uri'
require 'json'
require 'pry'

page = Nokogiri::HTML(open("https://namu.wiki/w/%EB%A7%88%EB%B2%95%EC%82%AC(%EB%94%94%EC%95%84%EB%B8%94%EB%A1%9C%20III)/%EA%B8%B0%EC%88%A0"))
tags = page.css('div.content-wrapper > article > div.wiki-content > div > h2, h3')

ret_array = Array.new
skill_array = Array.new
cate_hash = Hash.new

tags.each do |tag|
  if tag.name == "h2"
    unless cate_hash.empty?
      cate_hash[:items] = skill_array
      ret_array << cate_hash
      cate_hash = Hash.new
      skill_array = Array.new
    end
    cate_hash[:text] = tag.content
  elsif tag.name == "h3"
    skill_array << {:text => tag.content, :leaf => true}
  end
end
ret_hash = {:items => ret_array}

File.open("test.json", "w") do |f|
  f.write(ret_hash.to_json)
end
