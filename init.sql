--
-- PostgreSQL database dump
--

\restrict HCqdbVVddZvx7LBGpMITtTgD04gltL7N4qkWmkmGaJYu5SPyurojKAzuoNEOhHi

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-06-25 08:47:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 863 (class 1247 OID 32807)
-- Name: estado_periodo; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.estado_periodo AS ENUM (
    'PREINSCRIPCIÓN',
    'INSCRIPCIÓN',
    'FINALIZADO'
);


ALTER TYPE public.estado_periodo OWNER TO postgres;

--
-- TOC entry 866 (class 1247 OID 32814)
-- Name: estado_solicitud; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.estado_solicitud AS ENUM (
    'preinscrito',
    'inscrito'
);


ALTER TYPE public.estado_solicitud OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 40961)
-- Name: control_procesos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.control_procesos (
    id integer NOT NULL,
    proceso_actual character varying(50) NOT NULL
);


ALTER TABLE public.control_procesos OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 40960)
-- Name: control_procesos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.control_procesos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.control_procesos_id_seq OWNER TO postgres;

--
-- TOC entry 5088 (class 0 OID 0)
-- Dependencies: 225
-- Name: control_procesos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.control_procesos_id_seq OWNED BY public.control_procesos.id;


--
-- TOC entry 222 (class 1259 OID 32834)
-- Name: cursos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cursos (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    area character varying(50) NOT NULL
);


ALTER TABLE public.cursos OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 32833)
-- Name: cursos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cursos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cursos_id_seq OWNER TO postgres;

--
-- TOC entry 5089 (class 0 OID 0)
-- Dependencies: 221
-- Name: cursos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cursos_id_seq OWNED BY public.cursos.id;


--
-- TOC entry 230 (class 1259 OID 40988)
-- Name: inscripciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inscripciones (
    id integer NOT NULL,
    curso_select character varying(100),
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    whatsapp character varying(20) NOT NULL,
    cedula character varying(20) NOT NULL,
    correo character varying(100) NOT NULL,
    grado_instruccion character varying(100) NOT NULL,
    trabaja_actualmente character varying(10) NOT NULL,
    direccion_habitacion text NOT NULL,
    condicion_fisica_cognitiva text NOT NULL,
    referencia character varying(50) CONSTRAINT inscripciones_comprobante_pago_not_null NOT NULL,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    monto numeric(10,2),
    edad integer,
    fecha_nacimiento date,
    experiencia character varying(50) DEFAULT 'no'::character varying
);


ALTER TABLE public.inscripciones OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 40987)
-- Name: inscripciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inscripciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inscripciones_id_seq OWNER TO postgres;

--
-- TOC entry 5090 (class 0 OID 0)
-- Dependencies: 229
-- Name: inscripciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inscripciones_id_seq OWNED BY public.inscripciones.id;


--
-- TOC entry 220 (class 1259 OID 32820)
-- Name: periodos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.periodos (
    id integer NOT NULL,
    nombre_periodo character varying(100) NOT NULL,
    estado_actual public.estado_periodo DEFAULT 'PREINSCRIPCIÓN'::public.estado_periodo NOT NULL,
    activo boolean,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.periodos OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 32819)
-- Name: periodos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.periodos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.periodos_id_seq OWNER TO postgres;

--
-- TOC entry 5091 (class 0 OID 0)
-- Dependencies: 219
-- Name: periodos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.periodos_id_seq OWNED BY public.periodos.id;


--
-- TOC entry 228 (class 1259 OID 40970)
-- Name: preinscripciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.preinscripciones (
    id integer NOT NULL,
    curso_select character varying(100),
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    whatsapp character varying(20) NOT NULL,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.preinscripciones OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 40969)
-- Name: preinscripciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.preinscripciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.preinscripciones_id_seq OWNER TO postgres;

--
-- TOC entry 5092 (class 0 OID 0)
-- Dependencies: 227
-- Name: preinscripciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.preinscripciones_id_seq OWNED BY public.preinscripciones.id;


--
-- TOC entry 224 (class 1259 OID 32846)
-- Name: solicitudes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solicitudes (
    id integer NOT NULL,
    periodo_id integer NOT NULL,
    curso_id integer,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    whatsapp character varying(30) NOT NULL,
    cedula character varying(20) DEFAULT NULL::character varying,
    correo character varying(100) DEFAULT NULL::character varying,
    grado_instruccion character varying(100) DEFAULT NULL::character varying,
    trabaja_actualmente character varying(10) DEFAULT NULL::character varying,
    direccion_habitacion text,
    condicion_fisica_cognitiva character varying(10) DEFAULT NULL::character varying,
    comprobante_pago character varying(255) DEFAULT NULL::character varying,
    estado public.estado_solicitud DEFAULT 'preinscrito'::public.estado_solicitud NOT NULL,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.solicitudes OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 32845)
-- Name: solicitudes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.solicitudes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.solicitudes_id_seq OWNER TO postgres;

--
-- TOC entry 5093 (class 0 OID 0)
-- Dependencies: 223
-- Name: solicitudes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.solicitudes_id_seq OWNED BY public.solicitudes.id;


--
-- TOC entry 4900 (class 2604 OID 40964)
-- Name: control_procesos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.control_procesos ALTER COLUMN id SET DEFAULT nextval('public.control_procesos_id_seq'::regclass);


--
-- TOC entry 4890 (class 2604 OID 32837)
-- Name: cursos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cursos ALTER COLUMN id SET DEFAULT nextval('public.cursos_id_seq'::regclass);


--
-- TOC entry 4903 (class 2604 OID 40991)
-- Name: inscripciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscripciones ALTER COLUMN id SET DEFAULT nextval('public.inscripciones_id_seq'::regclass);


--
-- TOC entry 4887 (class 2604 OID 32823)
-- Name: periodos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.periodos ALTER COLUMN id SET DEFAULT nextval('public.periodos_id_seq'::regclass);


--
-- TOC entry 4901 (class 2604 OID 40973)
-- Name: preinscripciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.preinscripciones ALTER COLUMN id SET DEFAULT nextval('public.preinscripciones_id_seq'::regclass);


--
-- TOC entry 4891 (class 2604 OID 32849)
-- Name: solicitudes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes ALTER COLUMN id SET DEFAULT nextval('public.solicitudes_id_seq'::regclass);


--
-- TOC entry 5078 (class 0 OID 40961)
-- Dependencies: 226
-- Data for Name: control_procesos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.control_procesos (id, proceso_actual) FROM stdin;
1	INSCRIPCION
\.


--
-- TOC entry 5074 (class 0 OID 32834)
-- Dependencies: 222
-- Data for Name: cursos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cursos (id, nombre, area) FROM stdin;
13	Cejas y Pestañas	ESTÉTICA Y BIENESTAR
14	Costura	ESTÉTICA Y BIENESTAR
15	Barberia	ESTÉTICA Y BIENESTAR
16	Manicure y Pedicure	ESTÉTICA Y BIENESTAR
17	Cosmetologia	ESTÉTICA Y BIENESTAR
18	Masoterapia	ESTÉTICA Y BIENESTAR
19	Fisioterapia	ESTÉTICA Y BIENESTAR
20	Monitor Deportivo	ESTÉTICA Y BIENESTAR
21	Tecnico Informatica	TECNOLOGÍA Y ADMINISTRACIÓN
22	Computacion	TECNOLOGÍA Y ADMINISTRACIÓN
23	Excel basico	TECNOLOGÍA Y ADMINISTRACIÓN
24	Programacion	TECNOLOGÍA Y ADMINISTRACIÓN
25	Asistente Administrativo	TECNOLOGÍA Y ADMINISTRACIÓN
26	Asistente Contable	TECNOLOGÍA Y ADMINISTRACIÓN
28	Higiene y seguridad Industrial	TECNOLOGÍA Y ADMINISTRACIÓN
29	Diseño Grafico	TECNOLOGÍA Y ADMINISTRACIÓN
30	Publicidad y Mercadeo	TECNOLOGÍA Y ADMINISTRACIÓN
31	Farmacia	SALUD Y OFICIOS
32	Enfermeria	SALUD Y OFICIOS
33	Asistente Dental	SALUD Y OFICIOS
34	Pasteleria y Panaderia	SALUD Y OFICIOS
35	Gastronomia	SALUD Y OFICIOS
36	Mecanica de Moto	SALUD Y OFICIOS
37	Electricidad	SALUD Y OFICIOS
38	Mantenimiento Electrico	SALUD Y OFICIOS
39	Ingles de Jovenes	IDIOMAS Y JURÍDICO
40	Ingles de Niño	IDIOMAS Y JURÍDICO
41	Asistente Juridico	IDIOMAS Y JURÍDICO
42	Criminalista	IDIOMAS Y JURÍDICO
43	Refrigeracion	IDIOMAS Y JURÍDICO
44	Secretariado	IDIOMAS Y JURÍDICO
45	Oratoria	IDIOMAS Y JURÍDICO
46	Dibujo Artistico	IDIOMAS Y JURÍDICO
\.


--
-- TOC entry 5082 (class 0 OID 40988)
-- Dependencies: 230
-- Data for Name: inscripciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inscripciones (id, curso_select, nombre, apellido, whatsapp, cedula, correo, grado_instruccion, trabaja_actualmente, direccion_habitacion, condicion_fisica_cognitiva, referencia, fecha_registro, monto, edad, fecha_nacimiento, experiencia) FROM stdin;
1	2	Jose	Prueba	+584120000000	V-20111222	jose.prueba@gmail.com	Bachiller	No	Villa de Cura, Centro	Ninguna	123456	2026-06-14 21:51:57.137912	\N	\N	\N	no
5	\N	Juan	Perez	04120000000	12345678	pablorodriguez@gmail.com	Bachiller	no	villa de cura	no	1243	2026-06-15 00:00:00	\N	\N	\N	no
6	manicure y pedicure	victoria	gonzales	+584120000000	V-20111222	jose.prueba@gmail.com	universidad	No	Villa de Cura, Centro	Ninguna	123456	2026-06-15 04:25:25.946116	\N	\N	\N	no
7	mecanica	victor	gonzales	+584120000000	V-20111222	jose.prueba@gmail.com	universidad	No	Villa de Cura, Centro	Ninguna	pagopng	2026-06-15 04:27:17.945421	\N	\N	\N	no
8	electricidad	juan pedro	vergas	+584120000000	V-20111222	jose.prueba@gmail.com	universidad	No	Villa de Cura, Centro	Ninguna	pagopng	2026-06-15 04:27:44.309164	\N	\N	\N	no
9	electricidad	juan pedro	vergas	+584120000000	V-20111222	jose.prueba@gmail.com	universidad	No	Villa de Cura, Centro	Ninguna	pagopng	2026-06-15 04:53:00.953169	\N	\N	\N	no
10	informatica	andry	vergas	+584120000000	V-20111222	jose.prueba@gmail.com	universidad	No	Villa de Cura, Centro	Ninguna	pagopng	2026-06-15 22:07:42.205981	\N	\N	\N	no
11	informatica	andry	vergas	+584120000000	V-20111222	jose.prueba@gmail.com	universidad	No	Villa de Cura, Centro	Ninguna	pagopng	2026-06-15 23:28:01.129289	\N	\N	\N	no
14	Test	Test	Test	+58	1	a@b.com	uni	true	calle	Ning	data	2026-06-16 00:01:08.94807	\N	\N	\N	no
15	cejas	Cesar Diaz	pedro	+584124052188	2526278	pablorodriguezjunior12345@gmail.com	primaria	si	urb el toquito,manzana 14b- casa num 19	no	vlcsnap-2024-07-10-10h49m58s856.png	2026-06-17 17:11:13.103271	\N	\N	\N	no
16	barberia	german	perez	042244807744	293834	germanperez@gmail.com	primaria	no	marcay	no	2546	2026-06-17 19:14:53.219283	25.50	\N	\N	no
17	Maquillaje	luis	gimenes	04223807766	15651134	luisjime@gmail.com	tecnico	si	villa de cura	no	2456	2026-06-17 20:19:45.511046	30.80	40	1994-10-01	no
18	Pestañas	Cesar Diaz	mosqueda	04243807334	2038754	cesarvladimirdia@gmail.com	secundaria	si	funda villa	no	2546	2026-06-17 21:06:30.931302	2728.00	28	2000-04-03	si
19	Programacion	pablito	rg	042435403729	31862971	pablorodriguezjunior12345@gmail.com	universitario	si	urb el toquito,manzana 14b	no	2524	2026-06-17 22:37:03.775832	9.74	24	2002-01-24	no
20	Secretariado	pablito	rg	042435403729	31862971	pablorodriguezjunior12345@gmail.com	tecnico	si	urb el toquito,manzana 14b	no	2524	2026-06-17 22:57:26.055441	9743.90	24	2002-01-24	no
21	Tecnico_en_Informatica	pablito	rg	042435403729	31862971	pablorodriguezjunior12345@gmail.com	secundaria	si	urb el toquito,manzana 14b	no	2524	2026-06-19 01:24:37.78203	9743.90	24	2002-01-24	no
22	Auxiliar_Farmacia	pablito	rg	041244774	3434343	pablorodriguezjunior12345@gmail.com	tecnico	si	mercedez	no	25225	2026-06-19 02:11:32.018593	8500.90	25	2000-05-25	si
23	Computacion	pablito	rg	65767656	3434343	pablorodriguezjunior12345@gmail.com	universitario	si	mercedez	no	25225	2026-06-19 02:49:33.898513	8500.90	25	2000-05-25	si
24	Excel basico	pablito	rg	042435403729	31862971	pablorodriguezjunior12345@gmail.com	primaria	si	urb el toquito,manzana 14b	no	2524	2026-06-19 02:55:49.487499	9743.90	24	34343-03-31	si
25	Computacion	pablito	rg	042435403729	31862971	pablorodriguezjunior12345@gmail.com	secundaria	no	urb el toquito,manzana 14b	no	2524	2026-06-19 21:18:31.928819	9743.90	24	20002-01-24	si
26	Farmacia	pedro luis	ramon	04245455543	25443345	pedroramon@gmail.com	secundaria	si	trece	no	2425	2026-06-20 00:26:54.315078	10000.00	28	2004-05-26	no
\.


--
-- TOC entry 5072 (class 0 OID 32820)
-- Dependencies: 220
-- Data for Name: periodos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.periodos (id, nombre_periodo, estado_actual, activo, fecha_creacion) FROM stdin;
1	2026-2	PREINSCRIPCIÓN	t	2026-06-13 22:46:24.63797
\.


--
-- TOC entry 5080 (class 0 OID 40970)
-- Dependencies: 228
-- Data for Name: preinscripciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.preinscripciones (id, curso_select, nombre, apellido, whatsapp, fecha_registro) FROM stdin;
2	2	Jose	Prueba	+584120000000	2026-06-14 21:19:54.394287
3	2	Jose	Prueba	+584120000000	2026-06-14 21:20:46.001774
4	2	Jose	Prueba	+584120000000	2026-06-14 21:20:59.395028
5	2	Jose	Prueba	+584120000000	2026-06-14 21:54:21.892421
6	2	Jose	Prueba	+584120000000	2026-06-15 01:36:08.499209
7	2	Jose	Prueba	+584120000000	2026-06-15 02:24:21.507903
8	barberia	Jose	Prueba	+584120000000	2026-06-15 04:01:18.570187
9	enfermeria	victoria	gonzales	+584120000000	2026-06-15 04:15:18.547555
10	electricidad	juan pedro	vergas	+584120000000	2026-06-15 04:53:18.153973
11	informatica	juan pedro	vergas	+584120000000	2026-06-15 05:04:29.835856
12	programacion	juan pedro	vergas	+584120000000	2026-06-15 05:07:49.162827
13	programacion	juan pedro	vergas	+584120000000	2026-06-15 22:07:05.471499
16	Test	Test	Test	+58	2026-06-16 00:01:08.938486
17	iNG	pablo	Rodriguez	+584120000000	2026-06-17 16:43:06.174272
18	programacion	andry 	silva	04223407754	2026-06-17 18:24:50.819954
19	costura	nais 	alvarez	042435037848	2026-06-17 18:27:53.529553
20	refrigeracion	ramon 	silva	'4243207841	2026-06-17 18:31:36.440351
21	Test	test	test	+58 412 1234567	2026-06-19 02:30:11.586233
22	Programacion	Test	User	+584121234567	2026-06-19 02:43:02.51109
23	P	N	U	+58	2026-06-19 02:46:59.392132
24	Programacion	Final	Test	+584121234599	2026-06-19 02:51:30.012139
25	Gastronomia	vladimir	perez	53252323	2026-06-19 02:52:16.74639
26	Oratoria	ramon silva	alvarez	0424353445	2026-06-20 00:24:36.08797
\.


--
-- TOC entry 5076 (class 0 OID 32846)
-- Dependencies: 224
-- Data for Name: solicitudes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.solicitudes (id, periodo_id, curso_id, nombre, apellido, whatsapp, cedula, correo, grado_instruccion, trabaja_actualmente, direccion_habitacion, condicion_fisica_cognitiva, comprobante_pago, estado, fecha_registro) FROM stdin;
4	1	\N	Estudiante	De Prueba	+584120000000	\N	\N	\N	\N	\N	\N	\N	preinscrito	2026-06-14 11:12:17.838841
\.


--
-- TOC entry 5094 (class 0 OID 0)
-- Dependencies: 225
-- Name: control_procesos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.control_procesos_id_seq', 1, false);


--
-- TOC entry 5095 (class 0 OID 0)
-- Dependencies: 221
-- Name: cursos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cursos_id_seq', 46, true);


--
-- TOC entry 5096 (class 0 OID 0)
-- Dependencies: 229
-- Name: inscripciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inscripciones_id_seq', 26, true);


--
-- TOC entry 5097 (class 0 OID 0)
-- Dependencies: 219
-- Name: periodos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.periodos_id_seq', 2, true);


--
-- TOC entry 5098 (class 0 OID 0)
-- Dependencies: 227
-- Name: preinscripciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.preinscripciones_id_seq', 26, true);


--
-- TOC entry 5099 (class 0 OID 0)
-- Dependencies: 223
-- Name: solicitudes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.solicitudes_id_seq', 4, true);


--
-- TOC entry 4917 (class 2606 OID 40968)
-- Name: control_procesos control_procesos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.control_procesos
    ADD CONSTRAINT control_procesos_pkey PRIMARY KEY (id);


--
-- TOC entry 4911 (class 2606 OID 32843)
-- Name: cursos cursos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cursos
    ADD CONSTRAINT cursos_pkey PRIMARY KEY (id);


--
-- TOC entry 4921 (class 2606 OID 41008)
-- Name: inscripciones inscripciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT inscripciones_pkey PRIMARY KEY (id);


--
-- TOC entry 4907 (class 2606 OID 32830)
-- Name: periodos periodos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.periodos
    ADD CONSTRAINT periodos_pkey PRIMARY KEY (id);


--
-- TOC entry 4919 (class 2606 OID 40981)
-- Name: preinscripciones preinscripciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.preinscripciones
    ADD CONSTRAINT preinscripciones_pkey PRIMARY KEY (id);


--
-- TOC entry 4913 (class 2606 OID 32869)
-- Name: solicitudes restriccion_inscripcion_unica; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT restriccion_inscripcion_unica UNIQUE (cedula, curso_id, periodo_id);


--
-- TOC entry 4915 (class 2606 OID 32867)
-- Name: solicitudes solicitudes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_pkey PRIMARY KEY (id);


--
-- TOC entry 4909 (class 2606 OID 32832)
-- Name: periodos unico_periodo_activo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.periodos
    ADD CONSTRAINT unico_periodo_activo UNIQUE (activo);


--
-- TOC entry 4922 (class 2606 OID 32875)
-- Name: solicitudes solicitudes_curso_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_curso_id_fkey FOREIGN KEY (curso_id) REFERENCES public.cursos(id) ON DELETE SET NULL;


--
-- TOC entry 4923 (class 2606 OID 32870)
-- Name: solicitudes solicitudes_periodo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_periodo_id_fkey FOREIGN KEY (periodo_id) REFERENCES public.periodos(id) ON DELETE CASCADE;


-- Completed on 2026-06-25 08:47:31

--
-- PostgreSQL database dump complete
--

\unrestrict HCqdbVVddZvx7LBGpMITtTgD04gltL7N4qkWmkmGaJYu5SPyurojKAzuoNEOhHi

