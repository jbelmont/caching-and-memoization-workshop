# Redis

[Redis Download](https://redis.io/download)

[Redis REPL](https://try.redis.io/)

Redis is not a plain key-value store, it is actually a data structures server, supporting different kinds of values.

Redis Data Structures:

* Binary-safe strings.
* Lists: collections of string elements sorted according to the order of insertion. They are basically linked lists.
* Sets: collections of unique, unsorted string elements.
* Sorted sets, similar to Sets but where every string element is associated to a floating number value, called score.
* Hashes, which are maps composed of fields associated with values. Both the field and the value are strings.
* Bit arrays (or simply bitmaps): it is possible, using special commands, to handle String values like an array of bits
* HyperLogLogs: this is a probabilistic data structure which is used in order to estimate the cardinality of a set.

## Redis Database

* In Redis, databases are simply identified by a number with the default database being number 0.
* If you want to change to a different database you can do so via the select command.
* In the command line interface, type select 1.
* Redis should reply with an OK message and your prompt should change to something like `redis 127.0.0.1:6379[1]>.`
* If you want to switch back to the default database, just enter select 0 in the command line interface

## Redis Commands

Redis commands are grouped by functionality

* Sets
    * Unique Elements.
    * Available commands: sadd, scard, sismember
* Lists:
    * collections of string elements
    * Available commands: llen, lpush
* Keys
* Hashes
    * consist of key and value pairs

Find all the available Redis Commands here [Redis Commands](https://redis.io/commands)

**You can filter by functionality because the default is to show all the Redis Commands**

## Redis Clients

You can find all the available Redis Client Libraries here [Redis Clients](https://redis.io/clients)

The particular client we will be using for the workshop is [Node Redis](https://github.com/NodeRedis/node_redis)

Redis breaks out uses for data structures according to how they should be used albeit lists, hashes, scalars, and sets

This means that if you have JSON object in Redis you can't just store like an json object
Also nested json objects should either be stringified with `JSON.stringify(obj)` or used with a hash data structure


## Querying Redis

Redis stores everything as a key so you can't use it like you would think as a normal query language

For example

`SELECT * from Books where Books.id = 1`

A type of query such as this wouldn't work in Redis

* Use lots of key-value pairs in Redis.
* So feel free to store each row of the table in a different row.
* Use Redis' hash map data type
* Form key name from primary key values of the table by a separator (such as ":")
* Store the remaining fields as a hash
* When you want to query a single row, directly form the key and retrieve its results
* When you want to query a range, use wild char "*" towards your key.

## Memory and Persistence in Redis

Redis is an in-memory persistent store

Redis keeps all your data in memory so there is an associated cost for this in terms of Server RAM

## Redis Data Structures

#### Strings

[String Data Type](https://redis.io/topics/data-types#strings)

[String Commands](https://redis.io/commands#string)

```sh
> set movies:rocky '{ "name": rocky, "characters": ["Rocky Balboa", "Paulie", "Adrien"] }'
OK

> get movies:rocky
"{ \"name\": rocky, \"characters\": [\"Rocky Balboa\", \"Paulie\", \"Adrien\"] }"

> strlen movies:rocky
(integer) 69

> append movies:rocky "Yo Adrian"
(integer) 78

> get movies:rocky
"{ \"name\": rocky, \"characters\": [\"Rocky Balboa\", \"Paulie\", \"Adrien\"] }Yo Adrian"
```

Notice above here that the string Yo Adrian was appended to the JSON object which doesn't really make sense
A JSON object can't really be represented as a string


```sh
127.0.0.1:6379[1]> help incr
INCR key
summary: Increment the integer value of a key by one
since: 1.0.0
group: string

127.0.0.1:6379[1]> incr random:num
(integer) 1

127.0.0.1:6379[1]> incr random:num
(integer) 2

127.0.0.1:6379[1]> help incrby
INCRBY key increment
summary: Increment the integer value of a key by the given amount
since: 1.0.0
group: string

127.0.0.1:6379[1]> incrby num:incr 10
(integer) 10

127.0.0.1:6379[1]> incrby num2:incr 25
(integer) 25

127.0.0.1:6379[1]> incr movies:rocky
(error) ERR value is not an integer or out of range
```

*Notice here that trying to increment movies:rocky created a Redis error which makes sense movies:rocky is a string*

#### Hashes

[Hash Data Type](https://redis.io/topics/data-types#hashes)

[Hash Commands](https://redis.io/commands#hash)

Hashes are like strings except you have a field value

```sh
127.0.0.1:6379[1]> hset users:user name bob
(integer) 1

127.0.0.1:6379[1]> hget users:user name
"bob"

127.0.0.1:6379[1]> hmset movie:fields name "Rocky" rating 5 year 1976
OK

127.0.0.1:6379[1]> HGETALL movie:fields
1) "name"
2) "Rocky"
3) "rating"
4) "5"
5) "year"
6) "1976"

127.0.0.1:6379[1]> hkeys movie:fields
1) "name"
2) "rating"
3) "year"

127.0.0.1:6379[1]> hkeys movie:fields
1) "name"
2) "rating"
3) "year"

127.0.0.1:6379[1]> hdel movie:fields rating
(integer) 1

127.0.0.1:6379[1]> hkeys movie:fields
1) "name"
2) "year"
```

Notice that we were able to set multiple fields with the Redis command `hmset` and get all the values with `hgetall`

*Hashes give you more control than regular strings because you can map values instead of one scalar value*

#### Lists

[List Data Type](https://redis.io/topics/data-types#lists)

[List Commands](https://redis.io/commands#list)

```sh
127.0.0.1:6379> lpush users "soldier" "John Rambo" "123-45-5678" "Sergeant First Class"
(integer) 4

127.0.0.1:6379> lindex users 0
"Sergeant First Class"

127.0.0.1:6379> lindex users 1
"123-45-5678"

127.0.0.1:6379> lindex users 2
"John Rambo"

127.0.0.1:6379> lindex users 3
"soldier"

127.0.0.1:6379[1]> lpop users
"Sergeant First Class"

127.0.0.1:6379> llen users
(integer) 3

127.0.0.1:6379[1]> rpop users
"soldier"

127.0.0.1:6379> rpop users
"soldier"
127.0.0.1:6379> llen users
(integer) 2
```

Notice here that we pushed 4 strings onto the list `users`

`lindex` takes a key and a index and returns the value if found else it returns `nil` so the lookup:

`lindex users 2` return "John Rambo"

Notice that `rpop` removes and returns the last element of the list stored at `key` so when we run `llen` the list has been reduced by 1.

Conversely `lpop` removes and returns the first element of the list stored at `key` so when we run `llen` again the list is now length of 2

#### Sets

[Set Data Type](https://redis.io/topics/data-types#sets)

[Set Commands](https://redis.io/commands#set)

* Sets are great for tagging or tracking any other properties of a value for which duplicates don’t make any sense
* Sets are also greate when you want to apply set operations such as intersections and unions

```sh
127.0.0.1:6379> sadd movies "Rocky"
(integer) 1

127.0.0.1:6379> sadd movies "The Matrix"
(integer) 1

127.0.0.1:6379> sadd movies "Chinese Connection"
(integer) 1

127.0.0.1:6379> scard movies
(integer) 3

127.0.0.1:6379> sadd movies2 "Rocky"
(integer) 1

127.0.0.1:6379> sadd movies2 "Rambo"
(integer) 1

127.0.0.1:6379> sadd movies2 "Chinese Connection"
(integer) 1

127.0.0.1:6379> sdiff movies movies2
1) "The Matrix"

127.0.0.1:6379> sinter movies movies2
1) "Rocky"
2) "Chinese Connection"

127.0.0.1:6379> sunion movies movies2
1) "The Matrix"
2) "Chinese Connection"
3) "Rocky"
4) "Rambo"

127.0.0.1:6379> sismember movies "Rocky"
(integer) 1

127.0.0.1:6379> smembers movies2
1) "Rambo"
2) "Rocky"
3) "Chinese Connection"
```

Notice here that created 2 different sets `movies` and `movies2` and we were able to do set operations on them.

* `sinter` returns the intersection between 2 or more sets
* `sdiff` returns the set difference between 2 or more sets
* `sunion` returns the all the movies that exist in the specified sets or more plainly the union between the sets
* `scard` returns the total number of elements or `cardinality` of the set
* `sismember` returns 1 (i.e. true) if a value exists in the set
* `smembers` returns all the values in the set
* `sadd` adds one or more members to a set

Read more commands at [Redis Set Commands](https://redis.io/commands#set)

#### Sorted Sets

[Sorted Set Data Type](https://redis.io/topics/data-types#sorted-sets)

[Sorted Set Commands](https://redis.io/commands#sorted_set)

```sh
127.0.0.1:6379> zadd grades 95 britney 85 dave 93 ashley 100 zhou
(integer) 4

127.0.0.1:6379> zcard grades
(integer) 4

127.0.0.1:6379> zrange grades 0 -1
1) "dave"
2) "ashley"
3) "britney"
4) "zhou"

127.0.0.1:6379> zrevrank grades dave
(integer) 3

127.0.0.1:6379> zrevrank grades zhou
(integer) 0
```

* `zadd` added 4 members to the grades sorted set
* `zcard` returned the cardinality value of 4
* `zrange` returned the lowest to highest members in the sorted set
* `zrevrank` returned the index of a member in a sorted set, with scores ordered from high to low
