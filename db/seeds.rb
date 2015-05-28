# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Adventure.delete_all

Adventure.create({
    location:"Costa Rica",
    activity:"Surfing",
    business:"Xavier's Surf Shop",
    comments:"I had great time. I will be back!!!!!"
    })

Adventure.create({
    location:"Costa Rica",
    activity:"Ziplining",
    business:"Zippy Zipline Inc.",
    comments:"I'm not coming back here. !!!!!"
    })

Adventure.create({
    location:"Italy",
    activity:"Dinner",
    business:"Sardinia Pucchini",
    comments:"Best Pizza Ever! Better than American Pizza!!"
    })

Adventure.create({
    location:"Amsterdam",
    activity:"Pot",
    business:"420 Head Coffee Shop",
    comments:"They got best shit. I am sooo high!!"
    })