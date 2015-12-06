require 'rubygems'
require 'nokogiri'
require 'open-uri'
require 'json'
require 'byebug'

def make_desc(tag)
  File.open("resources/data/#{tag.content}.html", "w") do |f|
    temp = tag.next.to_html
    temp.gsub!("data-original", "src")
    f.write(temp)
    a = tag.next.next.at("a")
    a.replace(a.text) unless a == nil
    f.write(tag.next.next)
  end
end

def parse_url(url)
  page = Nokogiri::HTML(open(url))
  tags = page.css('div.content-wrapper > article > div.wiki-content > div > h1, h2, h3')
  tags = tags[1..tags.size] unless tags.search('h1').size == 0

  ret_array = Array.new
  skill_array = Array.new
  cate_hash = Hash.new

  tags.each do |tag|
    temp = tag.content
    temp.gsub!('[편집]', '')
    splits = temp.split
    tag.content = splits[1..splits.size].join(" ")
    if tag.name == "h2" or tag.name == "h1"
      unless cate_hash.empty?
        cate_hash[:items] = skill_array
        ret_array << cate_hash
        cate_hash = Hash.new
        skill_array = Array.new
      end
      cate_hash[:text] = tag.content
    elsif tag.name == "h3"
      skill_array << {:text => tag.content, :leaf => true}
      make_desc(tag)
    end
  end

  cate_hash[:items] = skill_array
  ret_array << cate_hash
end

ret_array = Array.new
ret_array << {:text => '마법사', :items => parse_url("https://namu.wiki/w/%EB%A7%88%EB%B2%95%EC%82%AC(%EB%94%94%EC%95%84%EB%B8%94%EB%A1%9C%20III)/%EA%B8%B0%EC%88%A0")}
ret_array << {:text => '야만용사', :items => parse_url("https://namu.wiki/w/%EC%95%BC%EB%A7%8C%EC%9A%A9%EC%82%AC/%EA%B8%B0%EC%88%A0")}
ret_hash = Hash.new
ret_hash[:items] = ret_array

File.open("resources/data/skill.json", "w") do |f|
  f.write(ret_hash.to_json)
end
