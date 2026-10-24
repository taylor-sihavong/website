/* @ds-bundle: {"format":4,"namespace":"TaylorDS","components":[{"name":"Button"},{"name":"TextLink"},{"name":"SkipLink"},{"name":"Wordmark"},{"name":"SiteHeader"},{"name":"SiteFooter"},{"name":"SectionIntro"},{"name":"ProjectCard"},{"name":"OutcomeStat"},{"name":"Tag"},{"name":"AvailabilityBadge"},{"name":"Testimonial"},{"name":"Callout"},{"name":"TextField"},{"name":"StatusMessage"},{"name":"Sparkle"},{"name":"Section"},{"name":"FactList"},{"name":"StatRow"},{"name":"WorkIndex"},{"name":"Figure"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;

  function cx() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) if (arguments[i]) out.push(arguments[i]);
    return out.join(" ");
  }

  var idCount = 0;
  function useStableId(given, prefix) {
    var ref = React.useRef(null);
    if (ref.current === null) {
      idCount += 1;
      ref.current = given || (prefix || "ts") + "-" + idCount;
    }
    return ref.current;
  }

  function SrOnly(props) {
    return h("span", { className: "ts-sr-only" }, props.children);
  }

  var GLINT = "M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z";

  /* Sparkle: a static four-point glint. Always decorative. */
  function Sparkle(props) {
    var size = props.size || 20;
    return h(
      "svg",
      {
        className: cx("ts-sparkle", props.className),
        "data-tone": props.tone || "butter",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
        focusable: "false",
        style: props.style
      },
      h("path", { d: GLINT })
    );
  }

  /* Icons for status: 16px, 1.75 stroke, currentColor. */
  var ICONS = {
    success: [h("circle", { key: 1, cx: 8, cy: 8, r: 7 }), h("path", { key: 2, d: "M5 8.3l2 2 4-4.3" })],
    warning: [h("path", { key: 1, d: "M8 1.8l6.6 11.7H1.4z" }), h("path", { key: 2, d: "M8 6.3v3.2M8 11.6v.1" })],
    danger: [h("circle", { key: 1, cx: 8, cy: 8, r: 7 }), h("path", { key: 2, d: "M8 4.5v4.5M8 11.2v.1" })],
    info: [h("circle", { key: 1, cx: 8, cy: 8, r: 7 }), h("path", { key: 2, d: "M8 7.2v4.3M8 4.8v.1" })]
  };
  function StatusIcon(props) {
    return h(
      "svg",
      { className: "ts-icon", width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false" },
      ICONS[props.kind] || ICONS.info
    );
  }

  /* Button: primary (ink), secondary (outlined), ghost (link-styled). */
  function Button(props) {
    var variant = props.variant || "primary";
    var className = cx("ts-button", "ts-button--" + variant, props.size === "sm" ? "ts-button--sm text-small" : "text-body-strong", props.className);
    if (props.href && !props.disabled) {
      return h("a", { className: className, href: props.href, "data-state": props.state, onClick: props.onClick }, props.children);
    }
    return h(
      "button",
      {
        className: className,
        type: props.type || "button",
        "data-state": props.state,
        "aria-disabled": props.disabled ? "true" : undefined,
        onClick: function (e) {
          /* aria-disabled keeps the button focusable, so it must also refuse to act or submit. */
          if (props.disabled) {
            e.preventDefault();
            return;
          }
          if (props.onClick) props.onClick(e);
        }
      },
      props.children
    );
  }

  /* The arrow travels with the link's last word, so it never wraps onto a line alone. */
  function linkWithArrow(text) {
    var i = text.lastIndexOf(" ");
    return [
      i < 0 ? null : text.slice(0, i + 1),
      h("span", { className: "ts-link__tail", key: "t" }, i < 0 ? text : text.slice(i + 1),
        h("span", { "aria-hidden": "true", className: "ts-link__arrow" }, "↗"))
    ];
  }

  /* TextLink: inline link. external opens a new tab and adds a screen-reader note; arrow adds a small ↗. */
  function TextLink(props) {
    return h(
      "a",
      {
        className: cx("ts-link", props.className),
        href: props.href,
        "data-state": props.state,
        target: props.external ? "_blank" : undefined,
        rel: props.external ? "noopener noreferrer" : undefined
      },
      props.external && props.arrow && typeof props.children === "string" ? linkWithArrow(props.children) : [
        props.children,
        props.external && props.arrow ? h("span", { "aria-hidden": "true", className: "ts-link__arrow", key: "a" }, "↗") : null
      ],
      props.external ? h(SrOnly, null, " (opens in a new tab)") : null
    );
  }

  /* SkipLink: first focusable element on every page. */
  function SkipLink(props) {
    return h(
      "a",
      { className: cx("ts-skip", "text-body-strong", props.state === "focus" && "ts-skip--shown"), href: props.href || "#main" },
      props.children || "Skip to main content"
    );
  }

  /* Wordmark: the 直美 tile plus the name. */
  function Wordmark(props) {
    var tileOnly = props.variant === "tile";
    var name = props.name || "Taylor Sihavong";
    var children = [
      h("span", { className: "ts-wordmark__tile", "aria-hidden": "true", key: "t" }, h("span", null, "直"), h("span", null, "美")),
      tileOnly ? null : h("span", { className: "ts-wordmark__name", key: "n", "aria-hidden": "true" }, name),
      h(SrOnly, { key: "s" }, name + (props.href ? ", home" : ""))
    ];
    var attrs = { className: cx("ts-wordmark", tileOnly && "ts-wordmark--tile", props.className) };
    if (props.href) attrs.href = props.href;
    return h.apply(null, [props.href ? "a" : "span", attrs].concat(children));
  }

  /* SiteHeader: wordmark and navigation; a menu button below 720px.
     Escape closes the menu and returns focus to the button; choosing a link closes it. */
  function SiteHeader(props) {
    var links = props.links || [];
    var openState = React.useState(!!props.defaultOpen);
    var open = openState[0];
    var setOpen = openState[1];
    var navId = useStableId(props.id, "ts-nav");
    var toggleRef = React.useRef(null);

    function close(returnFocus) {
      setOpen(false);
      if (returnFocus && toggleRef.current) toggleRef.current.focus();
    }

    var items = links.map(function (l) {
      return h(
        "li",
        { key: l.label },
        h(
          "a",
          {
            className: "ts-nav__link text-body-strong",
            href: l.href,
            "aria-current": l.label === props.current ? "page" : undefined,
            onClick: function () {
              close(false);
            }
          },
          l.label
        )
      );
    });

    return h(
      "header",
      {
        className: cx("ts-header", props.forceCompact && "ts-header--compact", props.className),
        onKeyDown: function (e) {
          if (open && e.key === "Escape") close(true);
        }
      },
      h(
        "div",
        { className: "ts-header__inner" },
        h(Wordmark, { href: props.homeHref || "/" }),
        h(
          "button",
          {
            ref: toggleRef,
            className: "ts-header__toggle text-small",
            type: "button",
            "aria-expanded": open ? "true" : "false",
            "aria-controls": navId,
            onClick: function () {
              setOpen(!open);
            }
          },
          open ? "Close" : "Menu"
        ),
        h("nav", { className: "ts-nav", id: navId, "aria-label": "Main", "data-open": open ? "true" : "false" }, h("ul", { className: "ts-nav__list" }, items))
      )
    );
  }

  /* SiteFooter: a swell with a hard band along its edge, then either a heading and links, or (signoff) the 直美 tile with the links right after it. */
  function SiteFooter(props) {
    var links = (props.links || []).map(function (l) {
      return h("li", { key: l.label }, h(TextLink, { href: l.href, external: l.external }, l.label));
    });
    return h(
      "footer",
      { className: cx("ts-footer", props.className) },
      h(
        "svg",
        { className: "ts-footer__wave", viewBox: "0 0 1200 120", preserveAspectRatio: "none", "aria-hidden": "true", focusable: "false" },
        h("path", { className: "ts-footer__wave-back", transform: "translate(0 -8)", d: "M0 96 C 160 66, 320 70, 480 90 S 800 112, 960 88 S 1120 72, 1200 84 L1200 120 L0 120 Z" }),
        h("path", { className: "ts-footer__wave-front", d: "M0 96 C 160 66, 320 70, 480 90 S 800 112, 960 88 S 1120 72, 1200 84 L1200 120 L0 120 Z" })
      ),
      props.signoff
        ? h(
            "div",
            { className: "ts-page ts-grid ts-footer__inner ts-footer__inner--signoff" },
            h(
              "div",
              { className: "ts-z-full ts-footer__signoff" },
              h("span", { className: "ts-wordmark__tile", "aria-hidden": "true" }, h("span", null, "直"), h("span", null, "美")),
              links.length ? h("ul", { className: "ts-footer__links text-small" }, links) : null
            )
          )
        : h(
            "div",
            { className: "ts-footer__inner" },
            h("h2", { className: "text-h2 ts-footer__heading" }, props.heading || "There’s more to explore"),
            props.children ? h("p", { className: "text-body ts-footer__body" }, props.children) : null,
            links.length ? h("ul", { className: "ts-footer__links text-body-strong" }, links) : null,
            props.note ? h("p", { className: "text-small ts-footer__note" }, props.note) : null
          )
    );
  }

  /* SectionIntro: eyebrow, heading and lede. level sets the heading element. */
  function SectionIntro(props) {
    var level = props.level || 2;
    return h(
      "div",
      { className: cx("ts-intro", props.align === "center" && "ts-intro--center", props.className) },
      props.eyebrow ? h("p", { className: "text-label ts-intro__eyebrow" }, props.eyebrow) : null,
      h("h" + level, { className: cx(level === 1 ? "text-h1" : "text-h2", "ts-intro__title") }, props.title),
      props.lede ? h("p", { className: "text-lede ts-intro__lede" }, props.lede) : null
    );
  }

  /* Tag: a non-interactive label, sentence case. */
  function Tag(props) {
    return h("span", { className: cx("ts-tag", "text-tag", props.className), "data-tone": props.tone || "sky" }, props.children);
  }

  /* ProjectCard: the title link is stretched over the card, so the card is one tab stop. */
  function ProjectCard(props) {
    var level = props.level || 3;
    var tone = props.tone || "sky";
    var tags = (props.tags || []).map(function (t) {
      return h("li", { key: t }, h(Tag, { tone: tone }, t));
    });
    return h(
      "article",
      { className: cx("ts-card", props.className), "data-state": props.state, "data-tone": tone },
      h(
        "div",
        { className: "ts-card__media" },
        props.image ? h("img", { src: props.image, alt: props.alt || "", loading: "lazy" }) : h("div", { className: "ts-card__placeholder", "aria-hidden": "true" })
      ),
      h(
        "div",
        { className: "ts-card__body" },
        props.meta ? h("p", { className: "text-small ts-card__meta" }, props.meta) : null,
        h("h" + level, { className: "text-h3 ts-card__title" }, props.href ? h("a", { href: props.href, className: "ts-card__link" }, props.title) : props.title),
        props.outcome ? h("p", { className: "text-body ts-card__outcome" }, props.outcome) : null,
        tags.length ? h("ul", { className: "ts-card__tags", "aria-label": "Disciplines" }, tags) : null
      )
    );
  }

  /* OutcomeStat: the number first, then what it means. srValue is what screen readers hear. */
  function OutcomeStat(props) {
    return h(
      "div",
      { className: cx("ts-stat", props.featured && "ts-stat--featured", props.className), "data-tone": props.tone || "butter" },
      h("p", { className: "text-label ts-stat__label" }, props.label || "Outcome"),
      h(
        "p",
        { className: "text-stat ts-stat__value" },
        props.srValue ? [h("span", { "aria-hidden": "true", key: "v" }, props.value), h(SrOnly, { key: "s" }, props.srValue)] : props.value
      ),
      props.children ? h("p", { className: "text-body ts-stat__context" }, props.children) : null
    );
  }

  /* AvailabilityBadge: status in words, with a static glint. */
  function AvailabilityBadge(props) {
    var status = props.status || "open";
    return h(
      "p",
      { className: cx("ts-badge", props.className), "data-status": status },
      h(Sparkle, { size: 14, tone: "ink" }),
      h("span", { className: "text-tag" }, props.children)
    );
  }

  /* Testimonial: an exact quote with a named source. */
  function Testimonial(props) {
    return h(
      "figure",
      { className: cx("ts-quote", props.variant === "pull" && "ts-quote--pull", props.className), "data-tone": props.tone || "rose" },
      h("blockquote", { className: cx(props.variant === "pull" ? "text-h3" : "text-lede", "ts-quote__text") }, h("p", null, props.children)),
      h(
        "figcaption",
        { className: "ts-quote__cite" },
        h("span", { className: "text-body-strong" }, props.name),
        props.role ? h("span", { className: "text-small ts-quote__role" }, props.role) : null
      )
    );
  }

  /* Callout: a margin note (role="note"), with decorative circular pin lettering. */
  var PINS = {
    note: { text: "NOTE TO SELF", label: "Note to self" },
    context: { text: "READ ME FIRST", label: "Read me first" }
  };
  function Callout(props) {
    var type = props.type === "context" ? "context" : "note";
    var pin = PINS[type];
    var chars = pin.text.split("");
    var step = 250 / (chars.length - 1);
    var letters = chars.map(function (ch, i) {
      return h(
        "span",
        { key: i, className: "ts-callout__letter text-tag", style: { transform: "rotate(" + (-170 + i * step) + "deg) translateY(-40px)" } },
        ch === " " ? " " : ch
      );
    });
    return h(
      "div",
      { className: cx("ts-callout", props.className), "data-type": type, role: "note", "aria-label": pin.label },
      h("div", { className: "ts-callout__pin", "aria-hidden": "true" }, letters, h(Sparkle, { size: 20, tone: type === "note" ? "butter" : "sky", className: "ts-callout__gem" })),
      h("p", { className: "text-body ts-callout__text" }, props.children)
    );
  }

  /* TextField: visible label, optional hint, error with icon and hidden "Error:" prefix. */
  function TextField(props) {
    var id = useStableId(props.id, "ts-field");
    var hintId = props.hint ? id + "-hint" : null;
    var errId = props.error ? id + "-error" : null;
    var described = [hintId, errId].filter(Boolean).join(" ") || undefined;
    return h(
      "div",
      { className: cx("ts-field", props.error && "ts-field--error", props.className) },
      h("label", { className: "text-body-strong ts-field__label", htmlFor: id }, props.label, props.required ? h("span", { className: "text-small ts-field__req" }, " (required)") : null),
      props.hint ? h("p", { className: "text-small ts-field__hint", id: hintId }, props.hint) : null,
      h(props.multiline ? "textarea" : "input", {
        id: id,
        name: props.name,
        type: props.multiline ? undefined : props.type || "text",
        className: cx("ts-field__control", "text-body", props.multiline && "ts-field__control--multi"),
        rows: props.multiline ? props.rows || 5 : undefined,
        required: props.required,
        autoComplete: props.autoComplete,
        defaultValue: props.defaultValue,
        placeholder: props.placeholder,
        disabled: props.disabled,
        "aria-invalid": props.error ? "true" : undefined,
        "aria-describedby": described,
        "data-state": props.state
      }),
      props.error ? h("p", { className: "text-small ts-field__error", id: errId }, h(StatusIcon, { kind: "danger" }), h("span", null, h(SrOnly, null, "Error: "), props.error)) : null
    );
  }

  /* StatusMessage: inline feedback. Errors use role="alert"; everything else role="status". */
  var STATUS_WORD = { success: "Success", warning: "Warning", danger: "Error", info: "Note" };
  function StatusMessage(props) {
    var kind = STATUS_WORD[props.kind] ? props.kind : "info";
    return h(
      "div",
      { className: cx("ts-status", props.className), "data-kind": kind, role: kind === "danger" ? "alert" : "status" },
      h(StatusIcon, { kind: kind }),
      h(
        "div",
        { className: "ts-status__body" },
        h("p", { className: "text-body-strong ts-status__title" }, props.title || STATUS_WORD[kind]),
        props.children ? h("p", { className: "text-body ts-status__text" }, props.children) : null
      )
    );
  }


  /* ---------- Layout components ---------- */

  /* Section: full-width ink rule, number and label hanging in the label zone, title on the reading line.
     Children are placed by the consumer with the zone classes (ts-z-reading, ts-z-margin, ts-z-wide, ts-z-full). */
  function Section(props) {
    var level = props.level || 2;
    return h(
      "section",
      { className: cx("ts-section", "ts-grid", props.className), id: props.id, "aria-labelledby": props.id ? props.id + "-title" : undefined },
      h(
        "p",
        { className: "ts-z-label ts-section__label text-label" },
        props.number ? h("span", { className: "ts-section__number" }, props.number) : null,
        props.label ? h("span", null, props.label) : null
      ),
      h(
        "div",
        { className: "ts-z-reading" },
        h("h" + level, { className: cx(level === 1 ? "text-h1" : "text-h2", "ts-section__title"), id: props.id ? props.id + "-title" : undefined }, props.title),
        props.lede ? h("p", { className: "text-lede ts-section__lede", style: { marginTop: "var(--space-3)" } }, props.lede) : null
      ),
      props.children
    );
  }

  /* FactList: case study facts as ruled columns. items: [{ label, value, detail }] */
  function FactList(props) {
    var items = props.items || [];
    return h(
      "dl",
      { className: cx("ts-facts", props.className), style: { "--ts-facts-cols": String(props.columns || Math.min(items.length, 4)) } },
      items.map(function (it) {
        return h(
          "div",
          { className: "ts-facts__item", key: it.label },
          h("dt", { className: "text-label" }, it.label),
          h("dd", { className: "text-body" }, it.value, it.detail ? h("span", { className: "text-small ts-facts__detail" }, it.detail) : null)
        );
      })
    );
  }

  /* StatRow: outcome numbers set large and separated by hairlines. items: [{ label, value, srValue, context }] */
  function StatRow(props) {
    var items = props.items || [];
    return h(
      "ul",
      { className: cx("ts-statrow", props.className), style: { "--ts-stat-cols": String(items.length || 3) } },
      items.map(function (it) {
        return h(
          "li",
          { className: "ts-statrow__item", key: it.label },
          h("p", { className: "text-label ts-statrow__label" }, it.label),
          h("p", { className: "text-stat ts-statrow__value" }, it.srValue ? [h("span", { "aria-hidden": "true", key: "v" }, it.value), h(SrOnly, { key: "s" }, it.srValue)] : it.value),
          it.context ? h("p", { className: "text-body ts-statrow__context" }, it.context) : null
        );
      })
    );
  }

  /* WorkIndex: projects as ruled rows; each title link is stretched over its row. items: [{ meta, title, href, outcome, tags }] */
  function WorkIndex(props) {
    var level = props.level || 3;
    return h(
      "ol",
      { className: cx("ts-index", props.className) },
      (props.items || []).map(function (it, i) {
        return h(
          "li",
          { className: "ts-index__row", key: it.title, "data-state": i === props.hoverIndex ? "hover" : undefined },
          h("p", { className: "text-small ts-index__meta" }, it.meta),
          h(
            "div",
            null,
            h("h" + level, { className: "text-h3" }, it.href ? h("a", { className: "ts-index__link", href: it.href }, h("span", { className: "ts-index__title" }, it.title)) : it.title),
            it.outcome ? h("p", { className: "text-body", style: { marginTop: "var(--space-2)" } }, it.outcome) : null
          ),
          it.tags && it.tags.length
            ? h("ul", { className: "ts-index__tags", "aria-label": "Disciplines" }, it.tags.map(function (t) { return h("li", { key: t }, h(Tag, { tone: "neutral" }, t)); }))
            : h("span", null),
          h("span", { className: "ts-index__arrow text-h3", "aria-hidden": "true" }, "\u2192")
        );
      })
    );
  }

  /* Figure: an image with a caption; captionPlacement "margin" puts the caption in the margin zone from 1024px. */
  function Figure(props) {
    return h(
      "figure",
      { className: cx("ts-figure", props.captionPlacement === "margin" && "ts-figure--margin-caption", props.signature && "ts-figure--signature", props.className) },
      h(
        "div",
        { className: "ts-figure__media" },
        props.src ? h("img", { src: props.src, alt: props.alt || "", loading: "lazy" }) : h("div", { className: "ts-figure__placeholder", role: "img", "aria-label": props.alt || "Image placeholder" })
      ),
      props.caption ? h("figcaption", { className: "text-small ts-figure__caption" }, props.caption) : null
    );
  }

  /* applyContrastPreference: switch to the high-contrast theme when the reader asks for more contrast. */
  function applyContrastPreference(root) {
    var el = root || document.documentElement;
    if (!window.matchMedia) return function () {};
    var mq = window.matchMedia("(prefers-contrast: more)");
    function sync() {
      if (mq.matches) el.setAttribute("data-theme", "contrast");
      else if (el.getAttribute("data-theme") === "contrast") el.setAttribute("data-theme", "light");
    }
    sync();
    if (mq.addEventListener) mq.addEventListener("change", sync);
    return function () {
      if (mq.removeEventListener) mq.removeEventListener("change", sync);
    };
  }

  window.TaylorDS = {
    Button: Button,
    TextLink: TextLink,
    SkipLink: SkipLink,
    Wordmark: Wordmark,
    SiteHeader: SiteHeader,
    SiteFooter: SiteFooter,
    SectionIntro: SectionIntro,
    ProjectCard: ProjectCard,
    OutcomeStat: OutcomeStat,
    Tag: Tag,
    AvailabilityBadge: AvailabilityBadge,
    Testimonial: Testimonial,
    Callout: Callout,
    TextField: TextField,
    StatusMessage: StatusMessage,
    Sparkle: Sparkle,
    Section: Section,
    FactList: FactList,
    StatRow: StatRow,
    WorkIndex: WorkIndex,
    Figure: Figure,
    applyContrastPreference: applyContrastPreference
  };
})();
