CREATE TABLE drone_position (
    id                INT GENERATED ALWAYS AS IDENTITY,
    name              text not null,
    location          point not null,
    dest              point not null,
    altitude          double precision not null,
    bearing           double precision not null,
    speed             double precision not null,
    payload_percent   int not null,
    temp_celsius      double precision not null,
    battery_percent   int not null,
    created           timestamp with time zone default now()
);

CREATE TABLE drone_event (
    id                INT GENERATED ALWAYS AS IDENTITY,
    event_type        text not null,
    data              jsonb,
    created           timestamp with time zone default now()
);
