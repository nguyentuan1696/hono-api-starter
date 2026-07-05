CREATE EXTENSION IF NOT EXISTS "pgcrypto";
--> statement-breakpoint

CREATE OR REPLACE FUNCTION set_common_fields()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.id IS NULL THEN
    NEW.id = gen_random_uuid();
  END IF;

  IF TG_OP = 'INSERT' THEN
    NEW.created_at := COALESCE(NEW.created_at, NOW());
    NEW.updated_at := COALESCE(NEW.updated_at, NOW());
  END IF;

  IF TG_OP = 'UPDATE' THEN
    NEW.created_at := OLD.created_at;
    NEW.updated_at := NOW();
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint

DROP TRIGGER IF EXISTS trg_categories_common ON "categories";
CREATE TRIGGER trg_categories_common
BEFORE INSERT OR UPDATE ON "categories"
FOR EACH ROW EXECUTE FUNCTION set_common_fields();
--> statement-breakpoint

DROP TRIGGER IF EXISTS trg_documents_common ON "documents";
CREATE TRIGGER trg_documents_common
BEFORE INSERT OR UPDATE ON "documents"
FOR EACH ROW EXECUTE FUNCTION set_common_fields();
--> statement-breakpoint

DROP TRIGGER IF EXISTS trg_tags_common ON "tags";
CREATE TRIGGER trg_tags_common
BEFORE INSERT OR UPDATE ON "tags"
FOR EACH ROW EXECUTE FUNCTION set_common_fields();
--> statement-breakpoint

DROP TRIGGER IF EXISTS trg_series_common ON "series";
CREATE TRIGGER trg_series_common
BEFORE INSERT OR UPDATE ON "series"
FOR EACH ROW EXECUTE FUNCTION set_common_fields();
--> statement-breakpoint

DROP TRIGGER IF EXISTS trg_files_common ON "files";
CREATE TRIGGER trg_files_common
BEFORE INSERT OR UPDATE ON "files"
FOR EACH ROW EXECUTE FUNCTION set_common_fields();
--> statement-breakpoint

DROP TRIGGER IF EXISTS trg_documents_tags_common ON "documents_tags";
CREATE TRIGGER trg_documents_tags_common
BEFORE INSERT OR UPDATE ON "documents_tags"
FOR EACH ROW EXECUTE FUNCTION set_common_fields();
--> statement-breakpoint

DROP TRIGGER IF EXISTS trg_documents_files_common ON "documents_files";
CREATE TRIGGER trg_documents_files_common
BEFORE INSERT OR UPDATE ON "documents_files"
FOR EACH ROW EXECUTE FUNCTION set_common_fields();
--> statement-breakpoint

DROP TRIGGER IF EXISTS trg_documents_series_common ON "documents_series";
CREATE TRIGGER trg_documents_series_common
BEFORE INSERT OR UPDATE ON "documents_series"
FOR EACH ROW EXECUTE FUNCTION set_common_fields();
